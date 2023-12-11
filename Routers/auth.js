const express = require('express');
const router = express.Router();
const {createUser, signin, logout} = require("../controller/authController");
const passport = require('passport');
const registrationValidator = require("../validators/registrationValidator");


router.post("/signup", registrationValidator, createUser)
      .post("/signin", passport.authenticate("local"), signin)
      .get("/logout", passport.authenticate('jwt'), logout)

module.exports = router;  