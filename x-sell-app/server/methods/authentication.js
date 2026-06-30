import fs from "fs";
import path from "path";
import * as csv from "csv/sync";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const usersPath = path.join(__dirname, "..", "data", "users", "users.json");
const sessionsPath = path.join(__dirname, "..", "data", "users", "sessionList.csv");

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

function readCsv(filePath) {
  return csv.parse(fs.readFileSync(filePath, "utf-8"), { columns: true});
}

export function handleLogin(req, res) {
  const users = readJson(usersPath);
  const sessions = readCsv(sessionsPath);
  const data = req.body;

  const auth = users.some(
    (user) => user.nome === data.nome && user.senha === data.senha
  );
  //obtenção de token
  const genToken = "45678"
  //
  if (auth) {
    sessions.push({username: data.nome, token: genToken}); // inclusão de sessão
    fs.writeFileSync(sessionsPath, csv.stringify(sessions, {header: true}));
    console.log("Login efetuado por usuário: ", data.nome);
  }
  //enviar token
  return res.json({auth, genToken});
}

export function handleLogout(req, res) {
  const sessions = readCsv(sessionsPath);
  const data = req.body;
  const index = sessions.findIndex(
    (session) => session.username == data.nome 
  );
  if (index >= 0) { 
    sessions.splice(index, 1);
    fs.writeFile(sessionsPath, csv.stringify(sessions, {header: true}), (err)=> {if (err) console.log("erro logout: ", err);});
    console.log("Sessão encerrada: ", data.nome);
    return res.json(true);
  }

  else {
    console.log("Erro excluindo sessão: ", data.nome);
    return res.json(false);
  }
}

export function handleRegister(req, res) {
  const users = readJson(usersPath);
  const data = req.body;

  const userExists = users.some((user) => user.nome === data.nome);
  let saved = false;

  if (userExists) {
    return res.json({ userExists, saved });
  }

  users.push(data);

  fs.writeFile(usersPath, JSON.stringify(users, null, 2), (err) => {
    if (err) {
      console.log(err);
      return res.json({ userExists, saved });
    }

    console.log("Usuário adicionado: ", data.nome);
    saved = true;

    return res.json({ userExists, saved });
  });
}