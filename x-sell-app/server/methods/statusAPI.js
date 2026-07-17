import fs from "fs";
import path from "path";
import * as csv from "csv/sync"
import { fileURLToPath } from "url";
import { sendProcessCompleted } from "./mailService.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootPath = path.join(__dirname, "..");
const dbPath = path.join(rootPath, "data", "status", "db.csv");
const usersPath = path.join(rootPath, "data", "users", "users.csv");

function readCsv(filePath) {
  return csv.parse(fs.readFileSync(filePath, "utf-8"), { columns: true});
}

function getCurrentDate() {
  return new Date().toISOString();
}

export function searchItems(req, res) {
  try { 
    const users = readCsv(usersPath);
    const db = readCsv(dbPath);
    const user = users.find(
      (user) => user.username === res.locals.token.id
    );
    const tightDb = db.map((item ) =>
    {return {
      id_item : Number(item.id_item),
      status: Number(item.status),
      avaliacao: Number(item.avaliacao), 
      inputName: item.inputName, 
      outputName: item.outputName, 
      id_usuario: Number(item.id_usuario)} 
    });
    if (Number(user.id) >=0) {
    let filteredDb;
      if (user.admin == 'true') {
         filteredDb = tightDb; 
      } else {
        filteredDb = tightDb.filter(
          (row) => row.id_usuario == user.id
        );}
    if (filteredDb.length > 0) {
    return res.json({success: true, message: "Itens obtidos com sucesso", msgType: "success", database: filteredDb});
    } else {     console.log("6");
return res.json({success: false, message: "Não há processos associados", msgType: "info", database: []}); }
} } catch(err) { console.log(err);
  return res.json({success: false, message: err instanceof Error ? err.message : String(err), msgType: "error" , database: []});}
}

export function handleDetailSearch(req, res) {
  try { //console.log("1");
    const db = readCsv(dbPath);
    //console.log(req.body);
    const itemMatch = db.find(
      (item) => item.id_item == req.body.id_item
    );
    //console.log("itemMatch: ", itemMatch);
    if (itemMatch) {
    return res.json({success: true, message: "Item obtido com sucesso", msgType: "success", item: itemMatch})}
    else return res.json({success: false, message: "Não há processos associados", msgType: "info", item: null}); 
  
}  catch(err) { console.log(err);
  return res.json({success: false, message: err instanceof Error ? err.message : String(err), msgType: "error" , item: null});}
}

export function handleRating(req, res) {  //registra avaliação da solicitação;
    const db = readCsv(dbPath);
    const processIdx = db.findIndex( 
      (row) => row.id_item == req.body.id_item
    );
    if (processIdx>=0) {
      db[processIdx].avaliacao = req.body.rating;
      db[processIdx].status = 4;
      db[processIdx].texto_avaliacao = req.body.reviewText;
      db[processIdx].data_avaliado = getCurrentDate();
      fs.writeFileSync(dbPath, csv.stringify(db, {header: true}));
      return res.json({success: true, message: "Avaliação registrada", msgType: "success"})
    }
    else return res.json({success: false, message: "Erro: id inválido", msgType: "error"})
    //
}

const statusDateFields = {
  1: "data_aceito",
  2: "data_iniciado",
  3: "data_concluido",
  4: "data_avaliado",
};

function applyStatusChange(item, newStatus, reason) {
  const normalizedStatus = Number(newStatus);
  const dateField = statusDateFields[normalizedStatus];

  item.status = String(normalizedStatus);
  if (reason) {
    item["motivo_rejeicao"] = reason;
  }
  if (dateField && !item[dateField]) {
    item[dateField] = getCurrentDate();
  }

  return item;
}

export async function handleStatusSet(req,res) {
  const db = readCsv(dbPath);
  const {id_item, statusTo, comment} = req.body;
    const processIdx = db.findIndex( 
      (row) => row.id_item == id_item
    );
    if (processIdx>=0) {
      const wasAlreadyCompleted = Number(db[processIdx].status) === 3;
      db[processIdx] = applyStatusChange(db[processIdx], statusTo,comment);
      fs.writeFileSync(dbPath, csv.stringify(db, {header: true}));

      if (Number(statusTo) === 3 && !wasAlreadyCompleted) {
        const users = readCsv(usersPath);
        const processOwner = users.find(
          (user) => String(user.id) === String(db[processIdx].id_usuario)
        );

        if (processOwner?.email) {
          try {
            await sendProcessCompleted({
              email: processOwner.email,
              name: processOwner.nomeContato || processOwner.nome,
              protocol: db[processIdx].id_item,
              inputName: db[processIdx].inputName,
              completedAt: db[processIdx].data_concluido,
            });
          } catch (mailError) {
            console.error("Status atualizado, mas o e-mail de aviso de conclusão falhou:", mailError);
            return res.json({
              success: true,
              message: "Processo concluído, mas o aviso por e-mail não foi enviado",
              msgType: "warning",
            });
          }
        } else {
          console.warn(`Processo ${id_item} concluído sem e-mail cadastrado para o cliente.`);
        }
      }

      return res.json({success: true, message: "Sucesso", msgType: "success"})
    }
    else return res.json({success: false, message: "Erro: id inválido", msgType: "error"})
    //
}
