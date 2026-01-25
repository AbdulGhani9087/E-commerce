const Users = require("../models/Users");

exports.addToCart = async (req, res) => {
  let user = await Users.findById(req.user.id);
  user.cartData[req.body.itemId] += 1;
  await Users.findByIdAndUpdate(req.user.id, { cartData: user.cartData });
  res.json({ success: true });
};

exports.removeFromCart = async (req, res) => {
  let user = await Users.findById(req.user.id);
  if (user.cartData[req.body.itemId] > 0) user.cartData[req.body.itemId] -= 1;
  await Users.findByIdAndUpdate(req.user.id, { cartData: user.cartData });
  res.json({ success: true });
};

exports.getCart = async (req, res) => {
  let user = await Users.findById(req.user.id);
  res.json(user.cartData);
};
