const router = require("express").Router();
const controller = require("../controllers/userController");

router.post("/send-otp", controller.sendOTP);
router.post("/signup", controller.signup);
router.post("/login", controller.login);

module.exports = router;
