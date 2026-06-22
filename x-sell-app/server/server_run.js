const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();
const PORT = 3000;

app.use(cors())
app.use(express.json())
app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

// console.log(JSON.stringify(users))
app.post("/login", (req,res) => {
    //console.log(JSON.stringify(req.body));
    const users = require("./login/users.json")
    const data = req.body;
    const auth = users.some(
        (user) => user.nome === data.nome && user.senha === data.senha
    );
    console.log("auth is "+ JSON.stringify(auth));
    res.json(auth);
});

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
    fs.writeFile("./login/users.json", JSON.stringify(users), (err) => {
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

app.listen(PORT, () => {
  console.log(`Hey! Express server running at http://localhost:${PORT}/`);
});