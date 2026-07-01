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
    const users = readJson(usersPath);
    const db = readCsv(dbPath);
    //req has username and token, checks session, returns all instances with user (IMPLEMENT TOKEN LATER)
    //console.log(req.body.username)
    const user = users.find(
      (user) => user.nome === req.body.username
    );
    if (user.id >=0) {
    const filteredDb = db.filter(
        (row) => row.id_usuario == user.id
    );
    if (filteredDb.length > 0) {
    //console.log(filteredDb);
    return res.json({success: true, message: "Itens obtidos com sucesso", database: filteredDb});
    }
    else return res.json({success: false, message: "Não há processos associados", database: null});
}   else return res.json({success: false, message: "Erro encontrando processos", database: null});
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
      fs.writeFileSync(dbPath, csv.stringify(db, {header: true}));
      return res.json({success: true, message: "Avaliação registrada"})
    }
    else return res.json({success: false, message: "Erro: id inválido"})
    //
}