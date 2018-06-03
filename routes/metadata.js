const router = require('express').Router();
const path = require('path');
const multer = require('multer');

// metadata
router.post('/', multer({ dest: 'uploads/' }).single('file'), (req, res) => {
  return res.json(req.file);
});

router.get('/:filename', (req, res) => {
  const { filename } = req.params;
  return res.sendFile(path.join(__dirname, `../uploads/${filename}`));
});

module.exports = router;
