const express = require("express");
const router = express.Router();

const { getUser, getUserById } = require("../controllers/user");
const { isSignedIn, isAuthenticated } = require("../controllers/auth");

router.param("slug", getUserById);

router.get("/user/:slug", isSignedIn, isAuthenticated, getUser);

module.exports = router;