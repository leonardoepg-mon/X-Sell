# Organizando um Backend Express com Rotas, Controllers e Services

Uma boa prática em aplicações Express é separar as responsabilidades em camadas:

* **Routes**: definem os endpoints da API.
* **Controllers**: recebem a requisição HTTP e montam a resposta.
* **Services**: contêm a lógica de negócio.
* **Data**: arquivos ou banco de dados.

## Estrutura de Pastas

```txt
server/
├─ server_run.js
├─ routes/
│  └─ authRoutes.js
├─ controllers/
│  └─ authController.js
├─ services/
│  └─ userService.js
└─ data/
   └─ users/
      └─ users.json
```

---

## server_run.js

Arquivo principal do servidor.

```js
import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", authRoutes);

app.listen(3000, "0.0.0.0", () => {
  console.log("Servidor rodando na porta 3000");
});
```

---

## routes/authRoutes.js

As rotas apenas direcionam a requisição para o controller.

```js
import express from "express";
import { login } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", login);

export default router;
```

---

## controllers/authController.js

O controller recebe os dados da requisição, chama o service e devolve a resposta.

```js
import { authenticateUser } from "../services/userService.js";

export function login(req, res) {
  const { nome, senha } = req.body;

  const auth = authenticateUser(nome, senha);

  console.log("auth is", auth);

  return res.json(auth);
}
```

---

## services/userService.js

### Opção 1 — Importando o JSON

Se estiver usando uma versão do Node compatível com importação de JSON:

```js
import users from "../data/users/users.json" with { type: "json" };

export function authenticateUser(nome, senha) {
  return users.some(
    (user) => user.nome === nome && user.senha === senha
  );
}
```

### Atenção

Como o JSON é carregado uma única vez, alterações feitas posteriormente no arquivo podem não ser refletidas imediatamente.

Se você possui uma rota `/register` que modifica `users.json`, esta abordagem pode causar inconsistências.

---

## Opção 2 — Lendo o arquivo a cada requisição (Recomendado para seu caso)

```js
import fs from "fs";

export function getUsers() {
  const file = fs.readFileSync(
    "./data/users/users.json",
    "utf-8"
  );

  return JSON.parse(file);
}

export function authenticateUser(nome, senha) {
  const users = getUsers();

  return users.some(
    (user) => user.nome === nome && user.senha === senha
  );
}
```

### Vantagem

Como o arquivo é lido novamente a cada chamada, qualquer usuário criado pela rota `/register` estará imediatamente disponível para autenticação.

---

## Fluxo da Aplicação

```txt
POST /login
      │
      ▼
authRoutes.js
      │
      ▼
authController.js
      │
      ▼
userService.js
      │
      ▼
users.json
```

Essa separação torna o código mais fácil de manter, testar e evoluir. Quando você migrar de `users.json` para SQLite, PostgreSQL ou MongoDB, provavelmente só precisará alterar o `userService.js`, mantendo as rotas e controllers praticamente inalterados.
