const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

//Index para testar
app.get("/", (req, res) => {
  res.send("You have accessed X-Sell app server application. Be content with this page.");
});

//Método de login, implementar token
app.post("/login", (req,res) => {
    const users = require("./data/users/users.json");
    const data = req.body;
    const auth = users.some(
        (user) => user.nome === data.nome && user.senha === data.senha
    );
    console.log("auth is "+ JSON.stringify(auth));
    res.json(auth);
});

//Método de registro
app.post("/register", (req,res) => {
    //console.log(JSON.stringify(req.body));
    const users = require("./data/users/users.json");
    const data = req.body;
    const userExists = users.some(
        (user) => user.nome === data.nome
    );
    var saved = false;
    console.log("userExists: "+ JSON.stringify(userExists));
    if (!userExists) {
    users.push(data);
    fs.writeFile("./data/users/users.json", JSON.stringify(users, null, 2), (err) => {
        if (err) {
        console.log(err);
        saved=false;
        return res.json({userExists, saved});
        }
        else {
            console.log("users.json atualizado");
            saved=true;
        return res.json({userExists, saved});}
        });
    } else return res.json({userExists, saved});
});

//Upload ao repositório de input

//Download do repositório de output

//API de verificação de status
app.post("./status", (req, res) => {
    const data = req.body;
    const status = require("./data/status/status.json");
    //requisição deve conter nome de usuário, fazer seleção de planilhas que são do usuário, e resposta deve ser json apenas com os dados relevantes ao usuário
    return res.json(null)
});

//listening
app.listen(PORT, () => {
  console.log(`X-Sell server running at http://localhost:${PORT}/`);
});