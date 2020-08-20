const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 255,
    unique: 'Email already in use'
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  }
}, { timestamps: true });

userSchema.plugin(require('mongoose-beautiful-unique-validation'));

module.exports = mongoose.model('User', userSchema);