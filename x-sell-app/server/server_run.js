import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

import {
  checkSession,
  handleLogin,
  handleLogout,
  handleRegister,
  verifyJWT
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
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Você acessou o servidor de X-Sell App.");
});

app.post("/login", handleLogin);

app.get("/logout", verifyJWT, handleLogout);

app.get("/validate", verifyJWT, checkSession);

app.post("/register", handleRegister);

app.post("/upload", verifyJWT, handleUpload);

app.post("/reupload", verifyJWT, handleReupload);

app.post("/download", verifyJWT, handleDownload);

app.get("/status", verifyJWT, searchItems);

app.post("/rating", verifyJWT, handleRating)

app.listen(PORT, () => {
  console.log(`X-Sell server running at http://localhost:${PORT}/`);
});