const router = require('express').Router();

const cart = require('../controllers/cart');

router.get('/', cart.fetchCart).post('/', cart.addToCart);

module.exports = router;
