const fs = require('fs');
const path = require('path');

const rootPath = path.join(__dirname, '../');

exports.getData = (folderName) => {
    try {
        // Cambia para buscar la carpeta en la raíz del proyecto
        const dirPath = path.join(__dirname, `../../../${folderName}`);
        if (!fs.existsSync(dirPath)) {
            console.error(`La carpeta ${folderName} no existe: ${dirPath}`);
            return [];
        }
        const files = fs.readdirSync(dirPath);
        return files.map(file => JSON.parse(fs.readFileSync(path.join(dirPath, file), 'utf-8')));
    } catch (error) {
        console.error(`Error leyendo archivos en ${folderName}:`, error.message);
        return [];
    }
};


exports.saveData = (folder, id, data) => {
  try {
    const folderPath = path.join(rootPath, folder);
    const filePath = path.join(`folderPath, ${id}.json`); // Guarda el archivo como "id.json"
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`Archivo guardado en: ${filePath}`);
  } catch (err) {
    console.error(`Error guardando archivo en ${folder}:`, err);
  }
};