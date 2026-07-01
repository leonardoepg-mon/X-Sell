import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

import {
  handleLogin,
  handleLogout,
  handleRegister,
} from "./methods/authentication.js";
import { handleDownload, handleReupload, handleUpload } from "./methods/fileManagement.js";
import { handleRating, searchItems } from "./methods/statusAPI.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(morgan("combined"));

app.get("/", (req, res) => {
  res.send("Você acessou o servidor de X-Sell App.");
});

app.post("/login", handleLogin);

app.post("/logout", handleLogout);

app.post("/register", handleRegister);

app.post("/upload", handleUpload);

app.post("/reupload", handleReupload);

app.post("/download", handleDownload);

app.post("/status", searchItems);

app.post("/rating", handleRating)

app.listen(PORT, () => {
  console.log(`X-Sell server running at http://localhost:${PORT}/`);
});