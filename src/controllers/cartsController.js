const dataManager = require('../utils/dataManager');

exports.getAllCarts = (req, res) => {
  const carts = dataManager.getData('cart', 'cart'); 
  res.json(carts);
};

exports.createCart = (req, res) => {
  const carts = dataManager.getData('carts');
  const newCart = { id: Date.now(), items: [], ...req.body };
  carts.push(newCart);
  dataManager.saveData('carts', carts);
  res.status(201).json(newCart);
};

exports.addToCart = (req, res) => {
  const { id } = req.params;
  const { productId, quantity } = req.body;
  const carts = dataManager.getData('carts');
  const cart = carts.find(c => c.id === parseInt(id));

  if (cart) {
    cart.items.push({ productId, quantity });
    dataManager.saveData('carts', carts);
    res.status(201).json(cart);
  } else {
    res.status(404).json({ message: 'Cart not found' });
  }
};