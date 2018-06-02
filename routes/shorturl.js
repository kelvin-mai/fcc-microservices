const router = require('express').Router();
const short = require('shorteners');
const valid = require('valid-url');

const db = require('../models');

router.get('/links/', async (req, res) => {
  try {
    const links = await db.Url.find();
    res.json(links);
  } catch (err) {
    res.json(err);
  }
});

router
  .route('/links/*')

  .get(async (req, res) => {
    let url = req.url.replace('/', '');
    url = url.substr(url.indexOf('/') + 1);
    if (!valid.isWebUri(url)) res.json({ message: 'invalid url' });

    try {
      const link = await db.Url.findOne({ original: url });
      console.log(link);
      if (!link) throw new Error();
      res.json(link);
    } catch (err) {
      res.json({ message: 'not found' });
    }
  })

  .post(async (req, res) => {
    let url = req.url.replace('/', '');
    url = url.substr(url.indexOf('/') + 1);
    if (!valid.isWebUri(url)) res.json({ message: 'invalid url' });

    try {
      const linkCreated = await db.Url.create({
        original: url,
        short: short.shortener(url),
      });
      res.json(linkCreated);
    } catch (err) {
      res.json(err);
    }
  });

router.get('/*', async (req, res) => {
  let url = req.url.replace('/', '');

  try {
    const link = await db.Url.findOne({ short: url });
    res.redirect(link.original);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
