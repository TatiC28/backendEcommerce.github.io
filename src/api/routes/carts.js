const express = require('express');
const router = express.Router();
const { getAllCarts, createCartWithItems, addToCart } = require('../controllers/cartsController');

router.get('/', getAllCarts);
router.post('/', createCartWithItems);
router.post('/:id/add', addToCart);

module.exports = router;