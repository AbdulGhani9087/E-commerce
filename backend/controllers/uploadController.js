const path = require("path");

// Multer setup
const multer = require("multer");

// Storage engine
const storage = multer.diskStorage({
  destination: "./uploads/images",
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  },
});

// Upload middleware
const upload = multer({ storage }).single("product");

// Upload controller
const uploadImage = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json({ success: 0, message: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ success: 0, message: "No file uploaded" });
    }
    res.json({
      success: 1,
      image_url: `${process.env.BACKEND_URL || "http://localhost:4000"}/images/${req.file.filename}`,
    });
  });
};

module.exports = { uploadImage };
