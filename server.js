// import dependencies
// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const apiRoute = require('./sever/routes/sites.routes');
const apiRouteUser = require('./sever/routes/users.routes');
const apiRouteAuth = require('./sever/routes/todoListRoute');
const auth = require('./middleware/auth.js');

const app = express();
const { port } = process.env;

// set up mongoose

mongoose.connect(process.env.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})
  .then(() => {
    console.log('Database connected');
  })
  .catch(() => {
    console.log('Error connecting to database');
  });

// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// set up route
app.use('/api/site', auth, apiRoute);
app.use('/api/user', auth, apiRouteUser);
app.use('/api/auth', apiRouteAuth);
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to Project with Nodejs Express and MongoDB',
  });
});
app.listen(port, () => {
  // eslint-disable-next-line prefer-template
  console.log('Our server is running on port:' + port);
});
