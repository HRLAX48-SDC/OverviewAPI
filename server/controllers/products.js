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
    db.retrieveStylesPhotos(req.params.product_id).then((data) => {
      // for (let j = 0; j < data.rows.length; j++) {
      //   data.rows[j].photos = [];
      //   for (let i = j; i < data.rows.length; i++) {
      //     if (
      //       data.rows[i].style_id === data.rows[j].style_id &&
      //       data.rows[j].size === data.rows[i].size
      //     ) {
      //       data.rows[j].photos.push({
      //         thumbnail_url: data.rows[i].thumbnail_url,
      //         url: data.rows[i].url,
      //       });
      //       delete data.rows[i].url;
      //       delete data.rows[i].thumbnail_url;
      //     } else {
      //       break;
      //     }
      //   }
      // }
      let result = {
        product_id: req.params.product_id,
        results: data.rows,
      };
      res.status(200).send(result);
    });
  },
  fetchRelated: (req, res) => {},
};

module.exports = products;
