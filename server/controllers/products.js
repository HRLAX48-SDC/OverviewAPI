const { send } = require('express/lib/response');
const db = require('../../db/utils');

const products = {
  fetchList: (req, res) => {
    db.retrieveAllProducts(req.query.page, req.query.count)
      .then((data) => res.status(200).send(data.rows))
      .catch((err) => res.status(500).send(err));
  },
  fetchProduct: (req, res) => {
    db.retrieveProduct(req.params.product_id)
      .then((data) => {
        res.status(200).send(data.rows[0]);
      })
      .catch((err) => res.status(500).send(err));
  },
  fetchStyles: (req, res) => {
    db.retrieveStylesPhotos(req.params.product_id)
      .then((data) => {
        let result = {
          product_id: req.params.product_id,
          results: data.rows,
        };
        res.status(200).send(result);
      })
      .catch((err) => res.status(500).send(err));
  },
  fetchRelated: (req, res) => {
    db.retrieveRelated(req.params.product_id)
      .then((data) => {
        let result = data.rows.map((num) => num.related_product_id);
        res.status(200).send(data.rows[0].json_agg);
      })
      .catch((err) => res.status(500).send(err));
  },
};

module.exports = products;
