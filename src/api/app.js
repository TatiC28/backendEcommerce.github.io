const express = require('express');
const path = require('path');
const cors = require('cors'); // Importa cors

const app = express();


// Servir archivos estáticos desde la carpeta 'img' en la raíz del proyecto
app.use('/img', express.static(path.join(__dirname, 'img')));

// Habilitar CORS
app.use(cors());


app.use(express.json());

// Rutas
const productsRoutes = require('./routes/products');
const categoriesRoutes = require('./routes/categories');
const productsCommentsRoutes = require('./routes/productsComments');

app.use('/products', productsRoutes);
app.use('/categories', categoriesRoutes); // Registra las rutas de categorías
app.use('/products_comments', productsCommentsRoutes);



// Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});