const router = require('express').Router(),
	valid = require('valid-url'),
	short = require('shorteners');

const db = require('../models');

router
	.route('/*')
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
				short: short.shortener(url)
			})
				.then(link => res.json(link))
				.catch(err => res.json(err));
		} else {
			res.json({ message: 'invalid url' });
		}
	});

module.exports = router;
