const { query } = require('express');
const db = require('./index');

module.exports = {
  retrieveAllProducts: (page = 1, count = 5) => {
    const start = (page - 1) * Number(count);
    const end = start + Number(count);

    const queryString = `SELECT * FROM product WHERE id > $1 AND id <= $2`;

    return db.query(queryString, [start, end]);
  },

  retrieveProduct: (id) => {
    const queryString = `SELECT product.*, (SELECT json_agg(json_build_object('feature', feature, 'value', value)) AS features FROM features WHERE product_id = $1) FROM product WHERE product.id = $1`;

    return db.query(queryString, [id]);
  },

  retrieveStylesPhotos: (id) => {
    const queryString = `SELECT styles.id as style_id, styles.name, styles.original_price, styles.sale_price, styles.default_style as "default?", (SELECT jsonb_agg(jsonb_build_object('url', url, 'thumbnail_url', thumbnail_url)) AS photos FROM photos WHERE photos.styleid=styles.id), (SELECT jsonb_object_agg( skus.id, jsonb_build_object('size', skus.size, 'quantity', skus.quantity)) as skus FROM skus WHERE skus.styleid=styles.id) FROM styles WHERE productid = $1`;

    return db.query(queryString, [id]);
  },

  retrieveRelated: (id) => {
    const queryString = `SELECT related_product_id FROM related WHERE current_product_id = $1`;

    return db.query(queryString, [id]);
  },
};
