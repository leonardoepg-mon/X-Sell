const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();
const PORT = 3000;

app.use(cors())
app.use(express.json())

//Index para testar
app.get("/", (req, res) => {
  res.send("You have accessed X-Sell app server application. Be content with this page.");
});

//Método de login, implementar token
app.post("/login", (req,res) => {
    const users = require("./login/users.json")
    const data = req.body;
    const auth = users.some(
        (user) => user.nome === data.nome && user.senha === data.senha
    );
    console.log("auth is "+ JSON.stringify(auth));
    res.json(auth);
});

//Método de registro
app.post("/register", (req,res) => {
    console.log(JSON.stringify(req.body));
    const users = require("./login/users.json");
    const data = req.body;
    const userExists = users.some(
        (user) => user.nome === data.nome
    );
    var saved = false;
    console.log("userExists: "+ JSON.stringify(userExists));
    if (!userExists) {
    users.push(data);
    fs.writeFile("./login/users.json", JSON.stringify(users, null, 2), (err) => {
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

//Acesso ao repositório de input

//Acesso ao repositório de output

//API de verificação de status

//listening
app.listen(PORT, () => {
  console.log(`X-Sell server running at http://localhost:${PORT}/`);
});