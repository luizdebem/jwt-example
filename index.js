const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
dotenv.config();
app.use(express.json());

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log('connected to MongoDB!');
});

app.use('/api/user', authRoute);

app.listen(3000, () => {
  console.log('server running');
});