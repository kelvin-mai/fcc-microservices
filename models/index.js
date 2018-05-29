const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect(process.env.DATABASE || 'mongodb://localhost/microservice');
mongoose.Promise = global.Promise;

module.exports.Url = require('./url');
