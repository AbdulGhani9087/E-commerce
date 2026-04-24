const Users = require("../models/Users");
const OTP = require("../models/OTP");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

// Email Transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, 
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

exports.sendOTP = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ success: false, errors: "Email is required" });

  try {
    // Generate 6-digit OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Save to DB (replaces if exists or creates new)
    await OTP.findOneAndUpdate({ email }, { otp: otpCode }, { upsert: true, new: true });

    // Send Mail
    const mailOptions = {
      from: `"Shopper Support" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Your OTP for Shopper Registration",
      text: `Your One-Time Password (OTP) for registration is: ${otpCode}. It expires in 10 minutes.`,
      html: `<h3>Welcome to Shopper!</h3><p>Your OTP for registration is: <b>${otpCode}</b></p><p>This code expires in 10 minutes.</p>`,
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "OTP sent to email" });
  } catch (error) {
    console.error("DETAILED OTP ERROR:", {
      message: error.message,
      stack: error.stack,
      code: error.code,
      command: error.command
    });
    res.status(500).json({ success: false, errors: "Failed to send OTP: " + error.message });
  }
};

exports.signup = async (req, res) => {
  const { name, email, password, otp } = req.body;
  
  // 1. Check if user already exists
  let check = await Users.findOne({ email });
  if (check) return res.status(400).json({ success: false, errors: "User with this email already exists" });

  // 2. Verify OTP
  const otpRecord = await OTP.findOne({ email, otp });
  if (!otpRecord) {
    return res.status(400).json({ success: false, errors: "Invalid or expired OTP" });
  }

  // 3. Create User
  let cart = {};
  for (let i = 0; i < 300; i++) cart[i] = 0;

  const isAdmin = email === (process.env.ADMIN_EMAIL || "admin@shopper.com");
  const user = new Users({ name, email, password, cartData: cart, isAdmin: isAdmin });
  await user.save();

  // 4. Delete OTP after successful signup
  await OTP.deleteOne({ _id: otpRecord._id });

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
