const express = require("express");
const router = express.Router();

const { getProduct, getProductById, createProduct } = require("../controllers/product");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user")

router.param("userId", getUserById);
router.param("productId", getProductById);

router.post("/product/create/:userId", isAdmin, isAuthenticated, isSignedIn, createProduct);

router.get("/product/:productId", getProduct);

module.exports = router;