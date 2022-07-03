//----------------------------------------------- FILE MANAGEMENT ------------------------------------------------

// On importe multer qui est un package qui permet de gérer les fichiers entrants dans les requêtes HTTP
const multer = require('multer');

//--Dictionary MIME types to define the images format-- Create an object
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

//--Create an Object to tell Multer to save & rename Images Files-- 
const storage = multer.diskStorage({
    //--File Destination to save Images file-- 
    destination: (req, file, callback) => { 
    // On passe le dossier images qu'on a créé dans le backend
    callback(null, 'images');
  },
    //--File Name-- 
   filename: (req, file, callback) => { 
    //--New name - Replacement of " " by "_" in file name--
    const name = file.originalname.split(" ").join("_"); 
    //--Setting up file extension--
    const extension = MIME_TYPES[file.mimetype]; 

    //--Call to callback +  null when no error / Create filename + add timestamp, dot & extension file
    callback(null, name + Date.now() + "." + extension); 
  },
});

//--Export module, pass storage object (single method for unique file & specify image)
module.exports = multer({ storage: storage }).single('image'); 





