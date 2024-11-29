const fs = require('fs');
const path = require('path');

const rootPath = path.join(__dirname, '../../');

exports.getData = (folder) => {
  try {
    const folderPath = path.join(rootPath, folder);
    console.log(`Leyendo archivos desde: ${folderPath}`); // Para depuración

    const files = fs.readdirSync(folderPath); // Leer todos los archivos en la carpeta
    const data = files
      .filter(file => file.endsWith('.json')) // Asegúrate de procesar solo archivos JSON
      .map(file => {
        const filePath = path.join(folderPath, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(fileContent); // Convierte el contenido a un objeto
      });

    console.log('Datos combinados:', data); // Para depuración
    return data; // Devuelve todos los datos combinados en un array
  } catch (err) {
    console.error(`Error leyendo archivos en ${folder}:`, err);
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