const express = require("express");
const router = express.Router();

const { getUser, getUserById } = require("../controllers/user");

router.param("slug", getUserById);

router.get("/user/:slug", getUser);

module.exports = router;