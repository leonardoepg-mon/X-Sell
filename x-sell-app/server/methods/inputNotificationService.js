import fs from "fs";
import path from "path";
import * as csv from "csv/sync";
import { fileURLToPath } from "url";

import { sendNewInputsNotification } from "./mailService.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootPath = path.join(__dirname, "..");
const dbPath = path.join(rootPath, "data", "status", "db.csv");
const ONE_HOUR_IN_MS =  60 * 60 * 1000;

function readDatabase(filePath) {
  return csv.parse(fs.readFileSync(filePath, "utf-8"), { columns: true });
}

function writeDatabase(filePath, database) {
  fs.writeFileSync(filePath, csv.stringify(database, { header: true }));
}

function getRecipients(value = process.env.NEW_INPUT_RECIPIENTS || "") {
  return value
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean);
}

export function ensureInputNotificationColumn(filePath = dbPath) {
  const database = readDatabase(filePath);
  const needsMigration = database.some(
    (item) => item.email_enviado === undefined,
  );

  if (!needsMigration) return;

  for (const item of database) {
    item.email_enviado ??= "";
  }
  writeDatabase(filePath, database);
}

export async function notifyPendingInputs({
  filePath = dbPath,
  recipients = getRecipients(),
  sendNotification = sendNewInputsNotification,
} = {}) {
  if (recipients.length === 0) {
    return { sent: false, processIds: [], reason: "missing-recipients" };
  }

  const database = readDatabase(filePath);
  const pendingItems = database.filter(
    (item) => item.email_enviado === "false",
  );

  if (pendingItems.length === 0) {
    return { sent: false, processIds: [], reason: "nothing-pending" };
  }

  const snapshots = new Map(
    pendingItems.map((item) => [String(item.id_item), item.data_envio]),
  );
  const processIds = [...snapshots.keys()].sort(
    (first, second) => Number(first) - Number(second),
  );

  await sendNotification({ destinations: recipients, processIds });

  // Reabre o CSV depois do envio para não sobrescrever uploads ocorridos
  // enquanto o servidor aguardava a resposta do provedor de e-mail.
  const latestDatabase = readDatabase(filePath);
  for (const item of latestDatabase) {
    const notifiedAt = snapshots.get(String(item.id_item));
    if (
      notifiedAt !== undefined &&
      item.data_envio === notifiedAt &&
      item.email_enviado === "false"
    ) {
      item.email_enviado = "true";
    }
  }
  writeDatabase(filePath, latestDatabase);

  return { sent: true, processIds };
}

export function startInputNotificationScheduler({
  intervalMs = ONE_HOUR_IN_MS,
} = {}) {
  ensureInputNotificationColumn();

  if (process.env.EMAIL_USE !== "true") {
    console.log("Avisos de novos inputs desativados: EMAIL_USE não está como true.");
    return undefined;
  }

  const recipients = getRecipients();
  if (recipients.length === 0) {
    console.log("Avisos de novos inputs desativados: NEW_INPUT_RECIPIENTS não foi configurado.");
    return undefined;
  }

  let isRunning = false;
  const run = async () => {
    if (isRunning) return;
    isRunning = true;

    try {
      const result = await notifyPendingInputs({ recipients });
      if (result.sent) {
        console.log(`Aviso de novos inputs enviado para os processos: ${result.processIds.join(", ")}`);
      }
    } catch (error) {
      // Em caso de falha, os processos continuam como false para nova tentativa.
      console.log("Falha ao enviar aviso de novos inputs:", error);
    } finally {
      isRunning = false;
    }
  };

  void run();
  const timer = setInterval(run, intervalMs);
  timer.unref?.();
  return timer;
}
