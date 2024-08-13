const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: function () {
      return this.password != null; // Only required if password is provided
    },
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
