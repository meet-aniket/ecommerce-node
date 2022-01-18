const express = require("express");
const router = express.Router();

const { createCategory, getCategory, getAllCategory, getCategoryById, updateCategory, removeCategory } = require("../controllers/category");
const { getUserById } = require("../controllers/user");
const { isAdmin, isAuthenticated, isSignedIn } = require("../controllers/auth");


router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

router.post("/category/create/:userId", isAdmin, isAuthenticated, isSignedIn, createCategory);

router.get("/category/:categoryId", getCategory);
router.get("/categories", getAllCategory);

router.put("/category/:categoryId/:userId", isSignedIn, isAuthenticated, isAdmin, updateCategory);
router.delete("/category/:categoryId/:userId", isSignedIn, isAuthenticated, isAdmin, removeCategory);

module.exports = router;