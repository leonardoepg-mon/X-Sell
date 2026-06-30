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

export function handleUpload(req, res)  {
  if (req.files && Object.keys(req.files).length !== 0) {
    const users = readJson(usersPath);
    const db = readCsv(dbPath);
    
    const uploadedFile = req.files.uploadFile;
    const username = req.body.username;

    const userId = users.find(
      (user) => user.nome === username
    ).id;
    //console.log(userId);

    //console.log("upload by user", username, ", de id: ",  userId);

    console.log("Arquivo recebido: ", uploadedFile.name);

    const uploadPath = path.join(
      rootPath,
      "data",
      "input",
      uploadedFile.name
    );

    uploadedFile.mv(uploadPath, (err) => {
      if (err) {
        console.log(err);
        return res.send("Falha no envio.");
      }

      console.log("Salvo em: ", uploadPath);
      const itemId = db.length + 1;
      db.push({id_item: db.length + 1 , status: "0", id_usuario:userId , inputName: uploadedFile.name , outputName: "null"});
      fs.writeFileSync(dbPath, csv.stringify(db, {header: true}));  
      return res.send("Recebido com sucesso.");
    });
  } else {
    return res.send("Nenhum arquivo recebido!");
  }
}

export function handleDownload(req, res) {
  console.log("Protocolo: ", req.body.protocol);
  const db = readCsv(dbPath);
  
  const match = db.find(
    (row) => row.id_item == req.body.protocol
  );
  const fileName = match.outputName;

  const filePath = path.join(rootPath, "data", "output", fileName);

  res.download(filePath, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Arquivo enviado: ", fileName);
    }
  });
}