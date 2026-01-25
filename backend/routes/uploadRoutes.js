const router = require("express").Router();
const { uploadImage } = require("../controllers/uploadController");

// Upload endpoint
router.post("/upload", uploadImage);

module.exports = router;
