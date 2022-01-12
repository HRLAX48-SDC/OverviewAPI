const pg = require('pg');
const config = require('../config');

const pool = new pg.Pool({
  host: config.host,
  user: config.user,
  database: config.database,
  password: '',
  port: config.port,
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('this error is happening: ', err);
  } else {
    console.log('DB CONNECTED USING:\n', config);
  }
});

module.exports = pool;
