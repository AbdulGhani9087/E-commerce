const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary using environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Use Cloudinary as multer storage — images are uploaded directly to the cloud
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "ecommerce-products",
    allowed_formats: ["jpg", "jpeg", "png", "webp", "svg"],
    transformation: [{ width: 800, height: 800, crop: "limit" }],
  },
});

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
    // Cloudinary returns the secure URL directly in req.file.path
    res.json({
      success: 1,
      image_url: req.file.path,
    });
  });
};

module.exports = { uploadImage };
