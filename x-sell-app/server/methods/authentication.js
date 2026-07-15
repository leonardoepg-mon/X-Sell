import fs from "fs";
import path from "path";
import * as csv from "csv/sync";
import { fileURLToPath } from "url";
import "dotenv/config";
import jwt from "jsonwebtoken";
import { sendAccountConfirmation } from "./mailService.js";
import { json } from "stream/consumers";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const usersPath = path.join(__dirname, "..", "data", "users", "users.csv");
const usersExpandedPath = path.join(__dirname, "..", "data", "users", "users.json");

function readCsv(filePath) {
  return csv.parse(fs.readFileSync(filePath, "utf-8"), { columns: true});
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

export function handleLogin(req, res) { //mudando de json para csv
  const users = readCsv(usersPath);
  const data = req.body;

  const idx = users.findIndex(
    (user) => user.nome === data.nome && user.senha === data.senha
  );

  //obtenção de token
  //
  if (idx>=0) {
    const genToken = generateToken({id: data.nome});

    return res.json({success: true, token: genToken, message: "Login feito com sucesso!", msgType: "success", isAdmin: (users[idx].admin == 'true')});
  }
  return res.json({success: auth, token: "", message: "Usuário ou senha incorretos", msgType: "error", isAdmin:false});
}

export async function handleRegister(req, res) {
  const users = readCsv(usersPath);
  const data = req.body.formData;
  const usersDetailed = readJson(usersExpandedPath);

  const userExists = users.some((user) => user.nome === data.username);

  if (userExists) {
    //console.log("Tentativa de criação de conta falhou.");
    return res.json({success: false, message: "Usuário já existe", msgType: "warning"});
  }
  if (!data.email) { //supérfluo
    return res.json({success: false, message: "Informe um e-mail válido", msgType: "warning"});
  } 

    try {
      await sendAccountConfirmation({
        email: data.email,
        name: data.nomeContato || data.nome,
        username: data.nome,
      });
    } catch (mailError) {
      console.error("Tentativa de criar conta falhou:", mailError);
      return res.json({
        success: true,
        message: "Não foi possível criar a conta. Tente novamente mais tarde",
        msgType: "error",
      });
    }

  try {
    const id = users.length + 1;
    users.push({nome: data.username,
      senha: data.password,
      nomeContato: data.nomeContato,
      email: data.email,
      id,
      admin: 'false', });
    usersDetailed.push({...data});
    fs.writeFileSync(usersPath, csv.stringify(users, {header: true}));
    fs.writeFileSync(usersExpandedPath, JSON.stringify(usersDetailed, null, 2));
    return res.json({success: true, message: "Cadastro enviado com sucesso. A equipe Fractals poderá avaliar o melhor caminho para sua empresa. Verifique seu e-mail.", msgType: "success"});
  } catch (err) {
    console.log(err);
    return res.json({success: false, message: "Erro no servidor", msgType: "error"});
  }
}

export function checkSession(req, res) {
  return res.json({success: true, message:"Sessão válida encontrada", msgType: "success" });
}

//Criação e checagem de tokens
// Tokens are generally passed in header of request

export function generateToken(body)  {
    // Validate User Here
    // Then generate JWT Token
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    const jwtExpires = process.env.JWT_EXPIRES;

    const token = jwt.sign(body, jwtSecretKey, {expiresIn: parseInt(jwtExpires)});
    
    return token;
}

// Verification of JWT

export function verifyJWT(req, res, next) {

  const jwtSecretKey = process.env.JWT_SECRET_KEY;
  //console.log(req.headers);
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({success: false, message: "Acesso negado.", msgType: "warning" });
  
  //token = req.headers["authorization"].replace("Bearer ", "");
  //if (blacklist[token]) return res.status(403).json({ message: "Invalid token." });
 
  try {
    const decoded = jwt.verify(token, jwtSecretKey);
    //console.log(decoded);
    if (!decoded) return res.status(403).json({success: false, message: "Acesso negado", msgType: "warning"});
  
    res.locals.token = decoded;
    
    return next();
  } catch (err) {
    //console.log(err);
    return res.status(403).json({ success: false,  message: err instanceof Error ? err.message : String(err) , msgType: "error" });
  }
}
