const express = require('express');
const router = express.Router();
const { getCategories } = require('../controllers/categoriesController'); // Importa el controlador

// Ruta para devolver las categorías
router.get('/', getCategories);

module.exports = router;
