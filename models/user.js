const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: String,
  exercises: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exercise',
    },
  ],
});

module.exports = mongoose.model('User', UserSchema);
