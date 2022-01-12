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
    // const queryString = `SELECT styles.id as style_id, styles.name, styles.original_price, styles.sale_price, styles.default_style as "default?", photos.thumbnail_url, photos.url, skus.id, skus.size, skus.quantity FROM styles LEFT JOIN photos ON styles.id = photos.styleid LEFT JOIN skus ON skus.styleid = styles.id WHERE productid = $1`;
    const queryString = `SELECT styles.id as style_id, styles.name, styles.original_price, styles.sale_price, styles.default_style as "default?", (SELECT json_agg(json_build_object('url', url, 'thumbnail_url', thumbnail_url)) AS photos FROM photos WHERE photos.styleid=styles.id), (SELECT json_object_agg( skus.id, json_build_object('size', skus.size, 'quantity', skus.quantity)) as skus FROM skus WHERE skus.styleid=styles.id) FROM styles WHERE productid = $1`;

    return db.query(queryString, [id]);
  },
};
