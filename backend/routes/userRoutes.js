const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { registerUser, loginUser } = require("../controllers/userController");

// route for register
router.post(
  "/auth/register",
  [
    check("name").trim().notEmpty(),
    check("email").isEmail(),
    check("password").isStrongPassword(),
  ],
  registerUser
);

// route for login
router.post(
  "/auth/login",
  [check("email").isEmail(), check("password").isStrongPassword()],
  loginUser
);

module.exports = router;
