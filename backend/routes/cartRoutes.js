const router = require("express").Router();
const fetchUser = require("../middleware/fetchUser");
const controller = require("../controllers/cartController");

router.post("/addtocart", fetchUser, controller.addToCart);
router.post("/removefromcart", fetchUser, controller.removeFromCart);
router.post("/getcart", fetchUser, controller.getCart);

module.exports = router;
