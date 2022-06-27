                //---- USER ROAD ----
const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
// const checkInputUser = require("../middleware/check-inputs-user");

//--Register--
router.post("/signup", /*checkInputUser*/ userCtrl.signup);

//--Log in--
router.post("/login", /*checkInputUser*/ userCtrl.login);

module.exports = router;