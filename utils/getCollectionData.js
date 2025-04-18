const fs = require("fs");
const path = require("path");

function getCollectionData(collectionName) {
  const dataDir = path.join(__dirname, "../_data");
  const collectionPath = path.join(dataDir, `${collectionName}.json`);

  if (fs.existsSync(collectionPath)) {
    const rawData = fs.readFileSync(collectionPath);
    try {
      const parsedData = JSON.parse(rawData);
      return Array.isArray(parsedData) ? parsedData : [parsedData];
    } catch (err) {
      console.error(`Gagal parsing JSON di ${collectionPath}:`, err);
      return [];
    }
  }

  const folderPath = path.join(dataDir, collectionName);
  if (fs.existsSync(folderPath) && fs.lstatSync(folderPath).isDirectory()) {
    const files = fs.readdirSync(folderPath).filter(file => file.endsWith(".json"));
    const items = files.map(file => {
      const itemPath = path.join(folderPath, file);
      const raw = fs.readFileSync(itemPath);
      try {
        return JSON.parse(raw);
      } catch (err) {
        console.error(`Gagal parsing JSON di ${itemPath}:`, err);
        return null;
      }
    }).filter(item => item !== null);
    return items;
  }

  return [];
}

module.exports = getCollectionData;
