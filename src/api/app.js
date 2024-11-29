const express = require('express');
const path = require('path');
const cors = require('cors'); // Importa cors

const app = express();

// Servir la carpeta img como estática
app.use('/img', express.static(path.join(__dirname, '../img'))); // Asegúrate de que el path sea correcto

// Habilitar CORS
app.use(cors());

// Otros middlewares
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