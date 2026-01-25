const router = require("express").Router();
const controller = require("../controllers/productController");

router.post("/addproduct", controller.addProduct);
router.post("/deleteproduct", controller.deleteProduct);
router.get("/allproducts", controller.getAllProducts);
router.get("/newcollections", controller.newCollections);
router.get("/popularinwomen", controller.popularInWomen);

module.exports = router;
