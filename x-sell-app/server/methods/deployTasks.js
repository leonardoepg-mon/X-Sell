import fs from "fs";
import path from "path";



export function initializePersistentData() {
  const seedDir = path.resolve("./seed_data");
  const dataDir = path.resolve("./data");

  fs.mkdirSync(dataDir, { recursive: true });

  const volumeIsEmpty = fs.readdirSync(dataDir).length === 0;

  if (volumeIsEmpty) {
    fs.cpSync(seedDir, dataDir, { recursive: true });
    console.log("Dados iniciais copiados para o Volume.");
  }
}
