import fs from "fs";
import path from "path";
import * as csv from "csv/sync"
import { fileURLToPath } from "url";

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

export function handleUpload(req, res)  { 
  if (req.files && Object.keys(req.files).length !== 0) {
    const users = readCsv(usersPath);
    const db = readCsv(dbPath);
    
    const uploadedFile = req.files.uploadFile;
    const username = res.locals.token.id;

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
        return res.json({success: false, message: "Falha no envio.", msgType: "warning"});
      }

      console.log("Salvo em: ", uploadPath);
      const itemId = db.length + 1;// adicionar timestamp
      db.push({id_item: db.length + 1 , status: "0", id_usuario:userId , inputName: uploadedFile.name , outputName: "", avaliacao:"-1", data_envio: getCurrentDate(),});
      fs.writeFileSync(dbPath, csv.stringify(db, {header: true}));
        return res.json({success: true, message: "Recebido com sucesso.", msgType: "success"});

    });
  } else {
        return res.json({success: false, message: "Nenhum arquivo recebido!", msgType: "error"});

  }
}

export function handleDownload(req, res) {
  //console.log("Protocolo: ", req.body.id_item);
  const db = readCsv(dbPath);
  
  const idx = db.findIndex(
    (row) => row.id_item == req.body.id_item
  );
  const fileName = db[idx].outputName;// adicionar timestamp
  const filePath = path.join(rootPath, "data", "output", fileName);


  res.download(filePath, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Arquivo enviado: ", fileName);
    }
  });
}

export function handleReupload(req, res)  {
  if (req.files && Object.keys(req.files).length !== 0) {
    const db = readCsv(dbPath);
    
    const uploadedFile = req.files.uploadFile;

    const idx = db.findIndex(
    (row) => row.id_item == req.body.id_item
    );

    //console.log("upload by user", username, ", de id: ",  userId);

    console.log("Re-upload de arquivo recebido: ", uploadedFile.name);

    const uploadPath = path.join(
      rootPath,
      "data",
      "input",
      uploadedFile.name
    );

    uploadedFile.mv(uploadPath, (err) => {
      if (err) {
        console.log(err);
        return res.json({success: false, message: "Falha no reenvio.", msgType: "error"});
      }

      console.log("Salvo em: ", uploadPath);
      db[idx].id_item = req.body.id_item;
      db[idx].status = 0;// adicionar timestamp
      db[idx].data_envio = getCurrentDate();
      db[idx].inputName = uploadedFile.name;
      fs.writeFileSync(dbPath, csv.stringify(db, {header: true})); 
      return res.json({success: true, message: "Recebido com sucesso.", msgType: "success"});
    });
  } else {
      return res.json({success: false, message: "Nenhum arquivo recebido!", msgType: "error"});
  }
}

export function handleAdminUpload(req, res)  {
  if (req.files && Object.keys(req.files).length !== 0) {
    const db = readCsv(dbPath);
    
    const uploadedFile = req.files.uploadFile;

    const idx = db.findIndex(
    (row) => row.id_item == req.body.id_item
    );

    
    console.log("Upload de analista recebido: ", uploadedFile.name);

    const uploadPath = path.join(
      rootPath,
      "data",
      "output",
      uploadedFile.name
    );

    uploadedFile.mv(uploadPath, (err) => {
      if (err) {
        console.log(err);
        return res.json({success: false, message: "Falha no envio.", msgType: "error"});
      }

      console.log("Salvo em: ", uploadPath);
      db[idx].id_item = req.body.id_item;
      db[idx].outputName = uploadedFile.name;
      fs.writeFileSync(dbPath, csv.stringify(db, {header: true})); 
      return res.json({success: true, message: "Recebido com sucesso.", msgType: "success"});
    });
  } else {
      return res.json({success: false, message: "Nenhum arquivo recebido!", msgType: "error"});
  }
}

export function handleAdminDownload(req, res) {
  const db = readCsv(dbPath);
  
  const idx = db.findIndex(
    (row) => row.id_item == req.body.id_item
  );
  const fileName = db[idx].inputName;
  const filePath = path.join(rootPath, "data", "input", fileName);

  res.download(filePath, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Arquivo enviado: ", fileName);
    }
  });
}