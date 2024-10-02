const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // ...
  role: {
    type: String,
    enum: ['normal', 'admin'],
    default: 'normal'
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;