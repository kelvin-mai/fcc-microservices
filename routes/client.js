const router = require('express').Router(),
	valid = require('valid-url'),
	short = require('shorteners');

const db = require('../models');

router.get('/', (req, res) => res.sendFile('index.html'));

router.get('/*', (req, res) => {
	const url = req.url.replace('/', '');
	db.Url.findOne({ short: url })
		.then(link => {
			if (!link) return Promise.reject({ message: 'not found' });
			res.redirect(link.original);
		})
		.catch(err => res.json(err));
});

module.exports = router;
