const router = require('express').Router();
const multer = require('multer');

// metadata
router.post('/', multer({ dest: 'uploads/' }).single('file'), (req, res) => {
  return res.json(req.file);
});

module.exports = router;
