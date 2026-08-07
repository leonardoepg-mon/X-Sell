import fs from "fs";
import path from "path";
import crypto from "crypto";
import * as csv from "csv/sync";
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

function createSafeFileName(originalName) {
  const baseName = path.basename(originalName);

  const sanitizedName = baseName
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9._-]/g, "_")
    .replace(/_+/g, "_");

  return `${crypto.randomUUID()}_${sanitizedName}`;
}

function getOriginalFileName(storedFileName) {
  return storedFileName.replace(
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}_/i,
    ""
  );
}

export function handleUpload(req, res)  { 
  if (req.files && Object.keys(req.files).length !== 0) {
    const users = readCsv(usersPath);
    const db = readCsv(dbPath);

    const uploadedFile = req.files.uploadFile;
    const storedFileName = createSafeFileName(uploadedFile.name);

    const username = res.locals.token.id;
    let userId; 
    if (req.body.userId==="0") {
    userId = users.find(
      (user) => user.username === username
    ).id;
    } else {userId = req.body.userId}

    console.log("Arquivo recebido: ", uploadedFile.name);
    console.log("Arquivo armazenado como:", storedFileName);

    const uploadPath = path.join(
      rootPath,
      "data",
      "input",
      storedFileName
    );
    uploadedFile.mv(uploadPath, (err) => {
      if (err) {
        console.log(err);
        return res.json({success: false, message: "Falha no envio.", msgType: "warning"});
      }
      const itemId = db.length + 1;// adicionar timestamp
      db.push({id_item: db.length + 1 , status: "0", id_usuario:userId , inputName: storedFileName, outputName: "", avaliacao:"-1", data_envio: getCurrentDate(), email_enviado: "false",});
      fs.writeFileSync(dbPath, csv.stringify(db, {header: true}));
        return res.json({success: true, message: "Recebido com sucesso.", msgType: "success"});

    });
  } else {
        return res.json({success: false, message: "Nenhum arquivo recebido!", msgType: "error"});
  }
}

export function handleDownload(req, res) {
  const db = readCsv(dbPath);
  
  const idx = db.findIndex(
    (row) => row.id_item == req.body.id_item
  );
  let fileName = db[idx].outputName;
  let filePath = path.join(rootPath, "data", "output", fileName);
  let downloadName = getOriginalFileName(fileName);

  if (req.body.isReport) {
  fileName = db[idx].reportName;
  filePath = path.join(rootPath, "data", "reports", fileName);
  downloadName = getOriginalFileName(fileName);
  }

  res.download(filePath,downloadName, (err) => {
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
    const storedFileName = createSafeFileName(uploadedFile.name);

    const idx = db.findIndex(
    (row) => row.id_item == req.body.id_item
    );

    console.log("Re-upload de arquivo recebido: ", uploadedFile.name);
    console.log("Arquivo armazenado como:", storedFileName);

    const uploadPath = path.join(
      rootPath,
      "data",
      "input",
      storedFileName
    );

    uploadedFile.mv(uploadPath, (err) => {
      if (err) {
        console.log(err);
        return res.json({success: false, message: "Falha no reenvio.", msgType: "error"});
      }
      db[idx].id_item = req.body.id_item;
      db[idx].status = 0;// adicionar timestamp
      db[idx].data_envio = getCurrentDate();
      db[idx].inputName = storedFileName;
      db[idx].email_enviado = "false";
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
    const storedFileName = createSafeFileName(uploadedFile.name);

    const idx = db.findIndex(
    (row) => row.id_item == req.body.id_item
    );

    console.log("Upload de analista recebido: ", uploadedFile.name, "tipo:", req.body.isReport ? "relatório":"output");
    console.log("Arquivo armazenado como:", storedFileName);

    const uploadPath = path.join(
      rootPath,
      "data", req.body.isReport? "reports": "output",
      storedFileName
    );

    uploadedFile.mv(uploadPath, (err) => { 
      if (err) {
        console.log(err);
        return res.json({success: false, message: "Falha no envio.", msgType: "error"});
      }
      db[idx].id_item = req.body.id_item;
      req.body.isReport? db[idx].reportName = storedFileName : db[idx].outputName = storedFileName;
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
  const downloadName = getOriginalFileName(fileName);

  res.download(filePath,downloadName, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Arquivo enviado: ", fileName);
    }
  });
}
