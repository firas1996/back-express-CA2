const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "The Name is required !!!!"],
    // unique: true,
  },
  email: {
    type: String,
    required: [true, "The Email is required !!!!"],
    unique: true,
    lowercase: true,
    // uppercase: true,
    validate: [validator.isEmail, "The email is not valid !!!!"],
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "The Password is required !!!!"],
    minlength: 8,
  },
  confirm_pass: {
    type: String,
    required: [true, "The Password is required !!!!"],
    minlength: 8,
    validate: {
      validator: function (cPass) {
        return cPass === this.password;
      },
    },
    message: "Confirm Pass does not much !!!!",
  },
  last_pass_change_date: {
    type: Date,
    default: Date.now(),
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
