const router = require('express').Router();

const products = require('./products');
const cart = require('./cart');

router.use('/products', products);
router.use('/cart', cart);

module.exports = router;
