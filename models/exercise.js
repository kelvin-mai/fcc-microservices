const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema({
  description: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  duration: Number,
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Exercise', ExerciseSchema);
