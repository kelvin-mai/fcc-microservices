const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect(process.env.DATABASE || 'mongodb://localhost/microservice');
mongoose.Promise = global.Promise;

module.exports.Url = require('./url');
module.exports.Image = require('./image');
module.exports.User = require('./user');
module.exports.Exercise = require('./exercise');
