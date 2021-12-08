const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    ID: {
      type: String,
    },
    password: {
      type: String,
      minlength: 5,
    },
    token: {
      type: String,
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

module.exports = { User };
