const mongoose = require("mongoose");

const Users = mongoose.model("Users", {
  name: String,
  email: { type: String, unique: true },
  password: String,
  cartData: Object,
  isAdmin: { type: Boolean, default: false },
  date: { type: Date, default: Date.now }
});

module.exports = Users;
