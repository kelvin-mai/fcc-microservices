const router = require('express').Router(),
	valid = require('valid-url'),
	short = require('shorteners');

const db = require('../models');

router.route('/').get((req, res) => {
	const { url } = req.query;
	res.json({ url });
});

module.exports = router;
