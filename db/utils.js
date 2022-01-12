const db = require('./index');

module.exports = {
  retrieveAllProducts: (page = 1, count = 5) => {
    const start = (page - 1) * count;
    const end = start + count;

    const queryString = `SELECT * FROM product WHERE id > $1 AND id <= $2`;

    return db.query(queryString, [start, end]);
  },
  retrieveProduct: (id) => {
    const queryString = `SELECT product.*, features.feature, features.value FROM product LEFT JOIN features ON product.id = features.product_id WHERE product.id = $1`;

    return db.query(queryString, [id]);
  },
  retrieveStyles: (id) => {
    const queryString = `SELECT product.id,`;

    return db.query(queryString, [id]);
  },
};
