const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise;

module.exports.Url = require('./url');
