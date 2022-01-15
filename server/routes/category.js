const express = require("express");
const router = express.Router();

const {} = require("../controllers/category");
const { getUserById } = require("../controllers/user");


router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

router.post("/category/create/:userId", createCategory);

router.get("/category/:categoryId", getCategory);
router.get("/categories", getAllCategory);

module.exports = router;