const express = require("express");
const cors = require("cors");
const fs = require("fs");
const fileUpload = require("express-fileupload");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(fileUpload());

//Index para testar
app.get("/", (req, res) => {
  res.send("Você acessou o servidor de X-Sell App.");
});

//Método de login, implementar token
app.post("/login", (req,res) => {
    const users = require("./data/users/users.json");
    const data = req.body;
    const auth = users.some(
        (user) => user.nome === data.nome && user.senha === data.senha
    );
    if (auth) console.log("Login efetuado por usuário: ", data.nome);
    res.json(auth);
});

//Método de login, implementar token
app.post("/logout", (req,res) => {
    const tokenList = require("./data/users/tokenList.json");
    const data = req.body;
    const position = tokenList.filter(
        (session) => session.nome !== data.nome || session.token !== data.token
    );
    fs.writeFile("./data/users/tokenList.json", JSON.stringify(tokenList, null, 2), (err) => {
        if (err) {
        console.log(err);
        return res.json(false);
        }
        else {
            console.log("Sessão encerrada: ", data.nome);
        return res.json(true);}
        });
});

//Método de registro, também implementar token
app.post("/register", (req,res) => {
    //console.log(JSON.stringify(req.body));
    const users = require("./data/users/users.json");
    const data = req.body;
    const userExists = users.some(
        (user) => user.nome === data.nome
    );
    var saved = false;
    //console.log("userExists: "+ JSON.stringify(userExists));
    if (!userExists) {
    users.push(data);
    fs.writeFile("./data/users/users.json", JSON.stringify(users, null, 2), (err) => {
        if (err) {
        console.log(err);
        saved=false;
        return res.json({userExists, saved});
        }
        else {
            console.log("Usuário adicionado: ", data.nome);
            saved=true;
        return res.json({userExists, saved});}
        });
    } else return res.json({userExists, saved});
});

//Upload ao repositório de input: implementar protocolo;
app.post("/upload", (req,res) => {
        console.log("Headers:", req.headers);
  console.log("Body:", req.body);
  console.log("Files:", req.files);
  // When a file has been uploaded
  if (req.files && Object.keys(req.files).length !== 0) {
    
    // Uploaded path
    const uploadedFile = req.files.uploadFile;

    // Logging uploading file
    console.log("Arquivo recebido: ", uploadedFile);

    // Upload path
    const uploadPath = __dirname
        + "/data/input/" + uploadedFile.name;

    // Save the file
    uploadedFile.mv(uploadPath, (err) => {
      if (err) {
        console.log(err);
        res.send("Falha no envio.");
      } else { res.send("Recebido com sucesso.");
                console.log("Salvo em: ", uploadPath);
      }
    });
  } else res.send("Nenhum arquivo recebido!");
});

//Download do repositório de output: corpo da requisição deve conter protocolo
app.post("/download", (req, res) => {

  res.download(__dirname + "/data/output/"+ req.body.fileName, (err) => {
    if (err) {
      console.log(err);
    } else {
        console.log("Arquivo enviado: ", req.body.fileName)
    }
  });
});

//API de verificação de status: recebe nome do usuário e envia status de protocolos associados
app.post("./status", (req, res) => {
    const data = req.body;
    const statusFull = require("./data/status/status.json");
    return res.json(null)
});

//listening
app.listen(PORT, () => {
  console.log(`X-Sell server running at http://localhost:${PORT}/`);
});