const router = require('express').Router();

const products = require('../controllers/products');

router
  .get('/', products.fetchList)
  .get('/:product_id', products.fetchProduct)
  .get('/:product_id/styles', products.fetchStyles)
  .get('/:product_id/related', products.fetchRelated);

module.exports = router;
