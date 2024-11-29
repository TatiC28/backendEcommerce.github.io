const express = require('express');
const router = express.Router();
const { getAllCarts, createCart, addToCart } = require('../controllers/cartsController');

router.get('/', getAllCarts);
router.post('/', createCart);
router.post('/:id/add', addToCart);

module.exports = router;