const express = require("express");
const router = express.Router();

const { getProductById, createProduct } = require("../controllers/product");
const { getUserById } = require("../controllers/user")

router.param("userId", getUserById);
router.param("productId", getProductById);

router.post("/product/create/:userId", createProduct);

// router.get("/product/:productId", getProduct);

module.exports = router;