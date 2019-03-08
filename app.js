'use strict';
// imports
const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const views = require('./views');
const models = require('./models');

// middleware
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use('/wiki', require('./routes/wiki'));
app.use('/user', require('./routes/user'));

// routes
app.get('/', (req, res, next) => {
  res.redirect('/wiki');
});

// sync db and start
const PORT = 1337;
const init = async () => {
  await models.db.sync({ force: true });
  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
  });
};
init();
