const db = require('./index');

module.exports = {
  retrieveAllProducts: (page = 1, count = 5) => {
    const start = (page - 1) * count;
    const end = start + count;

    const queryString = `SELECT * FROM product WHERE id > $1 AND id <= $2`;

    return db.query(queryString, [start, end]);
  },
  retrieveProduct: (id) => {
    const queryString = `SELECT *, (SELECT json_agg(json_build_object('feature', features.feature, 'value', features.value)) as features FROM features WHERE features.product_id = product.id) FROM product WHERE product.id = $1`;

    return db.query(queryString, [id]);
  },
};
