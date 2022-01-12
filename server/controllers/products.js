const db = require('../../db/utils');

const products = {
  fetchList: (req, res) => {
    db.retrieveAllProducts(req.query.page, req.query.count).then((data) =>
      res.status(200).send(data.rows)
    );
  },
  fetchProduct: (req, res) => {
    db.retrieveProduct(req.params.product_id).then((data) => {
      data.rows[0].features = [];
      for (let i = 0; i < data.rows.length; i++) {
        data.rows[0].features.push({
          feature: data.rows[i].feature,
          value: data.rows[i].value,
        });
      }
      delete data.rows[0].feature;
      delete data.rows[0].value;
      res.status(200).send(data.rows[0]);
    });
  },
  fetchStyles: (req, res) => {
    db.retrieveStyles(req.params.product_id).then((data) =>
      res.status(200).send(data.rows)
    );
  },
  fetchRelated: (req, res) => {},
};

module.exports = products;
