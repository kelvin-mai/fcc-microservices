const router = require('express').Router();
const axios = require('axios');

const db = require('../models');

const BING_KEY = process.env.BING_KEY;

// image abstraction
router.get('/imagesearch/:term', (req, res) => {
  const { term } = req.params;
  let { offset } = req.query;
  if (!offset) offset = 0;
  const host = 'api.cognitive.microsoft.com';
  const path = '/bing/v7.0/images/search';

  db.Image.create({ term });

  const url = `https://${host}${path}?q=${encodeURIComponent(
    term,
  )}&count=10&offset=${offset}`;

  axios
    .get(url, {
      headers: {
        'Ocp-Apim-Subscription-Key': BING_KEY,
      },
    })
    .then(({ data: { value } }) => {
      const results = value.map(v => {
        return {
          thumbnailUrl: v.thumbnailUrl,
          url: v.contentUrl,
          snippet: v.name,
          context: v.hostPageUrl,
        };
      });
      res.json(results);
    })
    .catch(e => {
      console.log('Error =>', e);
    });
});

router.get('/imagesearch', (req, res) => {
  db.Image.find()
    .then(images => {
      res.json(images);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
