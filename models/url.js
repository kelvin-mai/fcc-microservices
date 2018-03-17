const mongoose = require('mongoose');

const UrlSchema = new mongoose.Schema({
	original: { type: String, required: true },
	short: { type: String }
});

module.exports = mongoose.model('Url', UrlSchema);
