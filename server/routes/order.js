const express = require("express");
const router = express.Router();

const { isAdmin, isAuthenticated, isSignedIn } = require("../controllers/auth");
const { getUserById, pushOrderInPurchaseList } = require("../controllers/user");
const { updateStock } = require("../controllers/product");
const { createOrder, getAllOrders, getOrderById, getOrderStatus, updateStatus } = require("../controllers/order");

router.param("userId", getUserById);
router.param("orderId", getOrderById);

router.post("/order/create/:userId", isSignedIn, isAuthenticated, pushOrderInPurchaseList, updateStock, createOrder);
router.get("/order/all/:userId", isSignedIn, isAuthenticated, isAdmin, getAllOrders);

router.get("/order/status/:userId", isAdmin, isAuthenticated, isSignedIn, getOrderStatus);
router.put("/order/:orderId/status/:userId", isAdmin, isAuthenticated, isSignedIn, updateStatus);

module.exports = router;