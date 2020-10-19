// import dependencies
// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const apiRoute = require("./sever/routes/sites.routes");
const app = express();

// set up mongoose
mongoose.connect(process.env.url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Database connected');
  })
  .catch((error) => {
    console.log('Error connecting to database');
  });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// set up route
app.use("/api", apiRoute);

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to Project with Nodejs Express and MongoDB',
  });
});
app.listen(3000, () => {
  console.log('Our server is running on port ' + 3000);
});

