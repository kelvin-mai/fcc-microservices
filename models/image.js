const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  term: { type: String },
  when: { type: Date, default: Date.now() },
});

module.exports = mongoose.model('Image', ImageSchema);
