const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

// Define the schema for a user
const User = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  picPath: {
    type:String,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Add a pre-save hook to hash the password before saving
User.pre('save', async function(next) {
  if (this.isModified('password') || this.isNew) {
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    } catch (err) {
      return next(err);
    }
  }
  this.updatedAt = Date.now();
  next();
});

User.methods.passwordCheck = function(plaintext) {
  return bcrypt.compare(plaintext, this.password);
}


User.plugin(uniqueValidator);
const ff_users = mongoose.connection.useDb("ff_users");
module.exports = ff_users.model('User', User, 'users');

