//---------------------------- SAUCE ROUTES --------------------------------

//--Add plugin to use Express router--
const express = require("express");

//--Call to Router with express method-- 
const router = express.Router();

//--Associate functions to differents routes, - Import Controller--
const sauceCtrl = require("../controllers/sauce");

//--Import auth middleware to secure Routes--
const auth = require('../middleware/auth');

//--Import multer middleware to manage Images--
const multer = require("../middleware/multer-config");

//--Display All Sauces--
router.get('/', auth, sauceCtrl.getAllSauce);

//--Display 1 Sauce--
router.get('/:id', auth, sauceCtrl.getOneSauce);

//--Create Sauce-- 
router.post('/', auth, multer, sauceCtrl.createSauce);

//--Modify Sauce--
router.put('/:id', auth, multer, sauceCtrl.modifySauce);

//--Delete Sauce--
router.delete('/:id', auth, sauceCtrl.deleteSauce);

//--Manage Likes & Dislikes--
router.post('/:id/like', auth, sauceCtrl.likeSauce);

module.exports = router;

