const router = require('express').Router();
const valid = require('valid-url');
const short = require('shorteners');
const useragent = require('useragent');
const multer = require('multer');

const db = require('../models');

// header parser
router.get('/header/', (req, res) => {
  let ipaddress = req.ip;
  let language = req.acceptsLanguages()[0];
  let agent = useragent.parse(req.headers['user-agent']);
  let software = `${agent.os.family}_${agent.os.major}_${agent.os.minor}_${
    agent.os.patch
  }`;

  res.json({ ipaddress, language, software });
});

// timestamp
router.get('timestamp/:date', (req, res) => {
  let date = req.params.date;
  opt = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  let unix, natural;
  if (isNaN(date)) {
    natural = new Date(date).toLocaleDateString('en-us', opt);
    unix = new Date(date).getTime() / 1000;
  } else {
    unix = date;
    natural = new Date(date * 1000).toLocaleDateString('en-us', opt);
  }
  res.json({ unix, natural });
});

router.post(
  '/metadata/',
  multer({ dest: 'uploads/' }).single('file'),
  (req, res) => {
    return res.json(req.file);
  },
);

router.get('/short/', (req, res) => {
  db.Url.find()
    .then(links => res.json(links))
    .catch(err => res.json(err));
});

router
  .route('/short/*')
  .get((req, res) => {
    const url = req.url.replace('/', '');
    if (valid.isWebUri(url)) {
      db.Url.findOne({ original: url })
        .then(link => {
          if (!link) res.json({ message: 'not found' });
          res.json(link);
        })
        .catch(err => res.json(err));
    } else {
      db.Url.findOne({ short: url })
        .then(link => {
          if (!link) res.json({ message: 'not found' });
          res.json(link);
        })
        .catch(err => res.json(err));
    }
  })
  .post((req, res) => {
    const url = req.url.replace('/', '');
    if (valid.isWebUri(url)) {
      db.Url.create({
        original: url,
        short: short.shortener(url),
      })
        .then(link => res.json(link))
        .catch(err => res.json(err));
    } else {
      res.json({ message: 'invalid url' });
    }
  });

module.exports = router;
