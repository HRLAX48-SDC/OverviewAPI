const db = require('../../db/utils');

module.exports = {
  fetchCart: (req, res) => {
    db.retrieveCart().then((data) => {
      // what is this data ??????
      const result = data.rows.map((num) => num.product_id);

      res.status(200).send(result);
    });
  },

  addToCart: (req, res) => {
    // add to cart
  },
};
