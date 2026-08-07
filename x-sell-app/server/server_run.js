import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import morgan from "morgan";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

import {
  checkSession,
  handleLogin,
  handleRegister,
  seeUsers,
  setAdmin,
  verifyJWT
} from "./methods/authentication.js";
import { handleAdminDownload, handleAdminUpload, handleDownload, handleReupload, handleUpload } from "./methods/fileManagement.js";
import { handleRating, searchItems, handleStatusSet, handleDetailSearch } from "./methods/statusAPI.js";
import { startInputNotificationScheduler } from "./methods/inputNotificationService.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

function initializePersistentData() {
  const seedDir = path.resolve("./seed_data");
  const dataDir = path.resolve("./data");

  fs.mkdirSync(dataDir, { recursive: true });

  const volumeIsEmpty = fs.readdirSync(dataDir).length === 0;

  if (volumeIsEmpty) {
    fs.cpSync(seedDir, dataDir, { recursive: true });
    console.log("Dados iniciais copiados para o Volume.");
  }
}

initializePersistentData();
startInputNotificationScheduler();

app.use(cors({
  exposedHeaders: ["Content-Disposition"],
}));
app.use(express.json());
app.use(fileUpload());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.type("html").send(`
    <!DOCTYPE html>
    <html lang="pt-BR">
      <head>
        <meta charset="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <title>X-Sell</title>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />

        <style>
          * {
            box-sizing: border-box;
          }

          html,
          body {
            width: 100%;
            height: 100%;
            margin: 0;
          }

          body {
            background:
              #493b5f
              url("/x-sell-icon.svg")
              center / min(70vw, 400px)
              no-repeat;
          }
        </style>
      </head>

      <body></body>
    </html>
  `);
});

app.post("/login", handleLogin);

app.get("/validate", verifyJWT, checkSession);

app.post("/register", handleRegister);

app.post("/upload", verifyJWT, handleUpload);

app.post("/reupload", verifyJWT, handleReupload);

app.post("/download", verifyJWT, handleDownload);

app.post("/admin/upload", verifyJWT, handleAdminUpload);

app.post("/admin/download", verifyJWT, handleAdminDownload);

app.post("/admin/status", verifyJWT, handleStatusSet);

app.post("/admin/users", verifyJWT, setAdmin);

app.get("/admin/users", verifyJWT, seeUsers);

app.get("/status", verifyJWT, searchItems);

app.post("/details", verifyJWT, handleDetailSearch);

app.post("/rating", verifyJWT, handleRating)

app.listen(PORT, () => {
  console.log("X-Sell server running at", `${process.env.LOCAL_IP}:${PORT}`);
});
