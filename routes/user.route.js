const express = require("express");
const login = require("../controller/auth/login.js");
const signup = require("../controller/auth/signup.js");
const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);

module.exports = router;
