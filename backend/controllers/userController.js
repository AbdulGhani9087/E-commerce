const Users = require("../models/Users");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  let check = await Users.findOne({ email: req.body.email });
  if (check) return res.status(400).json({ success: false, errors: "User with this email already exists" });

  let cart = {};
  for (let i = 0; i < 300; i++) cart[i] = 0;

  const isAdmin = req.body.email === (process.env.ADMIN_EMAIL || "admin@shopper.com");
  const user = new Users({ ...req.body, cartData: cart, isAdmin: isAdmin });
  await user.save();

  const token = jwt.sign(
    { user: { id: user.id, isAdmin: user.isAdmin || false } },
    process.env.JWT_SECRET || "secret_ecom"
  );
  res.json({ success: true, authToken: token, isAdmin: user.isAdmin || false });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, errors: "All fields are required" });
  }

  const user = await Users.findOne({ email, password });
  if (!user) return res.status(400).json({ success: false, errors: "Invalid credentials" });

  const token = jwt.sign(
    { user: { id: user.id, isAdmin: user.isAdmin || false } },
    process.env.JWT_SECRET || "secret_ecom"
  );
  res.json({ success: true, authToken: token, isAdmin: user.isAdmin || false });
};
