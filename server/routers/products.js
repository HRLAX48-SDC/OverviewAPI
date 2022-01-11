const router = require('express').Router;

const products = require('PATH_TO_PRODUCT_CONTROLLERS');

router
  .get('/', products.MAIN)
  .get('/:product_id', products.SINGLEINFO)
  .get('/:product_id/styles', products.STYLES)
  .get('/:product_id/related', products.RELATED);

module.exports = router;
