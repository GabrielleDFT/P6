                //---- SAUCE ROAD ----
const express = require("express");
const router = express.Router();
const sauceCtrl = require("../controllers/sauce");
const auth = require('../middleware/auth');
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
