const db = require('../../db/utils');

const products = {
  fetchList: (req, res) => {
    db.retrieveAllProducts(req.query.page, req.query.count).then((data) =>
      res.status(200).send(data.rows)
    );
  },
  fetchProduct: (req, res) => {
    db.retrieveProduct(req.params.product_id).then((data) =>
      res.status(200).send(data.rows)
    );
  },
  fetchStyles: () => {},
  fetchRelated: () => {},
};

module.exports = products;
