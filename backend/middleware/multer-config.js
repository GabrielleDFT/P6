              //---- FILE MANAGEMENT ----
const multer = require("multer");

//--Dictionary MIME types to define the images format-- 
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

//--Create an Object to tell Multer to save & rename Images Files-- 
const storage = multer.diskStorage({
    //--File Destination to save Images file-- 
    destination: (req, file, callback) => { 
    callback(null, "images");
  },
    //--File Name-- 
  filename: (req, file, callback) => { 
    //--New name - Replacement of " " by "_" in file name--
    const name = file.originalname.split(" ").join("_"); 
    //--Setting up file extension--
    const extension = MIME_TYPES[file.mimetype]; 
    callback(null, name + Date.now() + "." + extension); //Assemblage du nom 
  },
});

module.exports = multer({ storage: storage }).single('image'); 
