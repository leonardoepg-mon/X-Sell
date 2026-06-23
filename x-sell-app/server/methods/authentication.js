export function handleLogin(req,res) {
    const users = require("./data/users/users.json")
    const data = req.body;
    const auth = users.some(
        (user) => user.nome === data.nome && user.senha === data.senha
    );
    console.log("auth is "+ JSON.stringify(auth));
    res.json(auth);
}

// Necessário? postergar implementação.