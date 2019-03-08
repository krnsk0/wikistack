const express = require('express');
const router = express.Router();
const views = require('../views');
const { Page } = require('../models');

router.get('/', (req, res, next) => {
  res.send('GET /wiki');
});

router.post('/', async (req, res, next) => {
  let title = req.body.title;
  let content = req.body.content;

  const page = new Page({
    title: title,
    content: content
  });

  try {
    await page.save();
    console.log('CREATED PAGE:', page.dataValues);
    res.redirect('/');
  } catch (error) {
    next(error);
  }
});

router.get('/add', (req, res, next) => {
  res.send(views.addPage());
});

router.get('/:slug', async (req, res, next) => {
  try {
    console.log('SLUG:', req.params.slug);
    const page = await Page.findOne({
      where: {
        slug: req.params.slug
      }
    });
    res.json(page);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
