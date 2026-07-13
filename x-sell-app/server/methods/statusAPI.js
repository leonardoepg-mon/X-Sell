import fs from "fs";
import path from "path";
import * as csv from "csv/sync"
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootPath = path.join(__dirname, "..");
const dbPath = path.join(rootPath, "data", "status", "db.csv");
const usersPath = path.join(rootPath, "data", "users", "users.json");

function readCsv(filePath) {
  return csv.parse(fs.readFileSync(filePath, "utf-8"), { columns: true});
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

export function searchItems(req, res) {
  try { //console.log("1");
    const users = readJson(usersPath);
    const db = readCsv(dbPath);
    //req has username and token, checks session, returns all instances with user (IMPLEMENT TOKEN LATER)
    //console.log(req.body.username)
    //console.log(res.locals.token.id);
    //console.log("2");
    const user = users.find(
      (user) => user.nome === res.locals.token.id
    );
    //console.log("3");
    if (user.id >=0) {
    let filteredDb;
      if (user.admin) {
         filteredDb = db; 
      } else {
        filteredDb = db.filter(
          (row) => row.id_usuario == user.id
        );}
    //console.log("4");
    if (filteredDb.length > 0) {
    //console.log(filteredDb);
    //console.log("5");
    return res.json({success: true, message: "Itens obtidos com sucesso", msgType: "success", database: filteredDb});
    } else {     //console.log("6");
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
    //req has item_id, rating and token, checks session, returns ok with message (IMPLEMENT TOKEN LATER)
    const processIdx = db.findIndex( //checa se item_id é válido
      (row) => row.id_item == req.body.id_item
    );
    if (processIdx>=0) {
      db[processIdx].avaliacao = req.body.rating;
      db[processIdx].status = 4;
      db[processIdx].texto_avaliacao = req.body.reviewText;
      fs.writeFileSync(dbPath, csv.stringify(db, {header: true}));
      return res.json({success: true, message: "Avaliação registrada", msgType: "success"})
    }
    else return res.json({success: false, message: "Erro: id inválido", msgType: "error"})
    //
}

export function handleStatusSet(req,res) {
  const db = readCsv(dbPath);
  const {id_item, statusTo} = req.body;
    //req has item_id, rating and token, checks session, returns ok with message (IMPLEMENT TOKEN LATER)
    const processIdx = db.findIndex( //checa se item_id é válido
      (row) => row.id_item == id_item
    );
    if (processIdx>=0) {
      db[processIdx].status = statusTo;
      fs.writeFileSync(dbPath, csv.stringify(db, {header: true}));
      return res.json({success: true, message: "Sucesso", msgType: "success"})
    }
    else return res.json({success: false, message: "Erro: id inválido", msgType: "error"})
    //
}