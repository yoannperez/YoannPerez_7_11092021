//                                         -------------------------------------------------------
//                                         --                  MULTER MIDDLEWARE                --
//                                         -------------------------------------------------------

// Loading module
const multer = require('multer');


// Create object , contains images filetypes
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

// Create storage constant
const storage = multer.diskStorage({
  // Difine which folder will be used to save file
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {

    // Prevent server's error deleting space in file names and replace by underscores
    const name = file.originalname.split(' ').join('_');

    const extension = MIME_TYPES[file.mimetype];
    // Define filename, use file original name, a timestamp, and extension defined by MIME_TYPES
    callback(null, name + Date.now() + '.' + extension);
  }
});

// Exports multer element, with storage constant, one single file type 'image' 
module.exports = multer({storage: storage}).single('image');