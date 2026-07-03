import fs from "fs";
import path from "path";
import * as csv from "csv/sync";
import { fileURLToPath } from "url";
import "dotenv/config";
import jwt from "jsonwebtoken";

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
  //
  if (auth) {
    const genToken = generateToken({id: data.nome});
    sessions.push({username: data.nome, token: genToken}); // inclusão de sessão
    fs.writeFileSync(sessionsPath, csv.stringify(sessions, {header: true}));
    //console.log("Login efetuado por usuário: ", data.nome);
    //console.log("Token gerado: ", genToken);
    return res.json({success: auth, token: genToken, message: "Login feito com sucesso!", msgType: "success"});
  }
  return res.json({success: auth, token: "", message: "Usuário ou senha incorretos", msgType: "error"});
}

export function handleLogout(req, res) {
  const sessions = readCsv(sessionsPath);
  const token = req.headers["authorization"];
  const username = res.locals.token.id;
  const index = sessions.findIndex(
    (session) => session.token == token
  );
  if (index >= 0) { 
    sessions.splice(index, 1);
    fs.writeFile(sessionsPath, csv.stringify(sessions, {header: true}), (err)=> {if (err) console.log("erro logout: ", err);});
    //console.log("Sessão encerrada: ", username);
    return res.json({success: true, message: "Logout feito.", msgType: "success"});
  }

  else {
    console.log("Erro excluindo sessão: ", username);
    return res.json({success: false, message: "Erro no logout.", msgType: "error"});
  }
}

export function handleRegister(req, res) {
  const users = readJson(usersPath);
  const data = req.body;

  const userExists = users.some((user) => user.nome === data.nome);

  if (userExists) {
    //console.log("Tentativa de criação de conta falhou.");
    return res.json({success: false, message: "Usuário já existe", msgType: "warning"});
  }

  users.push(data);

  fs.writeFile(usersPath, JSON.stringify(users, null, 2), (err) => {
    if (err) {
      console.log(err);
    return res.json({success: false, message: "Erro no servidor", msgType: "error"});
    }

    //console.log("Usuário adicionado: ", data.nome);

    return res.json({success: true, message: "Conta criada com sucesso", msgType: "success"});
  });
}

export function checkSession(req, res) {
  if (res.locals.token) return res.json({success: true, message:"Sessão válida encontrada", msgType: "success" });
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
  if (!token) return res.status(401).json({success: false, message: "Sem token.", msgType: "warning" });
  
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