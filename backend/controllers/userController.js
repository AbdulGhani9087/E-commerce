const Users = require("../models/Users");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  let check = await Users.findOne({ email: req.body.email });
  if (check) return res.status(400).json({ success: false });

  let cart = {};
  for (let i = 0; i < 300; i++) cart[i] = 0;

  const user = new Users({ ...req.body, cartData: cart });
  await user.save();

  const token = jwt.sign({ user: { id: user.id } }, "secret_ecom");
  res.json({ success: true, authToken: token });
};

exports.login = async (req, res) => {
  const user = await Users.findOne(req.body);
  if (!user) return res.status(400).json({ success: false });

  const token = jwt.sign({ user: { id: user.id } }, "secret_ecom");
  res.json({ success: true, authToken: token });
};
