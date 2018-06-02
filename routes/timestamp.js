const router = require('express').Router();

// timestamp
router.get('/:date', (req, res) => {
  const { date } = req.params;
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  let unix, natural;
  if (isNaN(date)) {
    natural = new Date(date).toLocaleDateString('en-us', options);
    unix = new Date(date).getTime() / 1000;
  } else {
    unix = date;
    natural = new Date(date * 1000).toLocaleDateString('en-us', options);
  }

  return res.json({ unix, natural });
});

module.exports = router;
