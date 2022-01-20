require('dotenv').config();
const express = require('express');
const app = express();
const router = require('./routers');
const path = require('path');
const ExpressRedisCache = require('express-redis-cache');
const cache = ExpressRedisCache({
  expire: 120, // optional: expire every 10 seconds
});

const cors = require('cors');
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, '/public')));
app.use('/api', cache.route(), router);

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
