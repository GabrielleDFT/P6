//---------------------------- USER ROUTES --------------------------------

//--Add plugin to use Express router--
const express = require("express");

//--Call to Router with express method-- 
const router = express.Router();

//--Associate functions to differents routes, - Import Controller--
const userCtrl = require("../controllers/user");

//--Register - Encrypts User password, add User to Database--
router.post("/signup", userCtrl.signup);

//--Log in - Vérify infos from User
router.post("/login", userCtrl.login);

module.exports = router;
