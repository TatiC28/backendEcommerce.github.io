const express = require('express');
const router = express.Router();
const productsCommentsController = require('../controllers/productsCommentsController');

// Ruta para obtener comentarios de un producto por su ID
router.get('/:id', productsCommentsController.getProductComments);

module.exports = router;
