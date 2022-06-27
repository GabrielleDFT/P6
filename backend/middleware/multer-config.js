              //---- FILE MANAGEMENT ----
const multer = require("multer");
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const storage = multer.diskStorage({
    //--File Destination-- 
    destination: (req, file, callback) => { 
    callback(null, "images");
  },
    //--File Name-- 
  filename: (req, file, callback) => { 
    //--Replacement of " " by "_" in the file name--
    const name = file.originalname.split(" ").join("_"); 
    //--Setting up file extension--
    const extension = MIME_TYPES[file.mimetype]; 
    callback(null, name + Date.now() + "." + extension); //Assemblage du nom 
  },
});

module.exports = multer({ storage: storage }).single('images'); 