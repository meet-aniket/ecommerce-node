var express = require("express");
var router = express.Router();
const { check } = require("express-validator");
const { signUp, signIn, signOut } = require("../controllers/auth");

router.post(
  "/signup",
  [
    check("name", "name should be at least 3 char long").isLength({ min: 3 }),
    check("email", "email is required!").isEmail(),
    check("password", "password should be at least 3 char long").isLength({ min:3 })
  ],
  signUp
);

router.post(
  "/signin",
  [
    check("email", "email is required!").isEmail(),
    check("password", "password should be at least 3 char long").isLength({ min:1 })
  ],
  signIn
);

router.get("/signout", signOut)

module.exports = router;

