const express = require('express');
const router = express.Router();
const views = require('../views');

router.get('/', (req, res, next) => {
  res.send('GET /wiki');
});

router.post('/', (req, res, next) => {
  const formData = res.json(req.body);

  res.send(formData);
});

router.get('/add', (req, res, next) => {
  res.send(views.addPage());
});

module.exports = router;
