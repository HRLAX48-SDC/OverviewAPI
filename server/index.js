require('dotenv').config();
const express = require('express');
const app = express();
const router = require('./routers');

const morgan = require('morgan');
const cors = require('cors');
const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
