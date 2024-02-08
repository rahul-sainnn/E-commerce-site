const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true

  },
  password:{
    type: String,
    min: 4,
    max: 20,
    required: true
  },
});

// Define any pre-save hooks or additional methods here

const User = mongoose.model('User', userSchema);

module.exports = User;
