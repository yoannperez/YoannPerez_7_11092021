//                   -------------------------------------------------------
//                   --                  ROUTES FOR POSTS                --
//                   -------------------------------------------------------
// -----------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------

const express = require("express");
const router = express.Router();
const db = require("../models");

// // Call Middlewares
const auth = require("../middleware/auth");
// const multer = require("../middleware/multer-config");

// // Import Controller
const postCtrl = require("../controllers/post-controller");

// ------------    PROFILE ROUTES   --------------------
router.post("/new", auth, postCtrl.create); 
router.get("/find", auth, postCtrl.get); 
router.get("/find/:id", auth, postCtrl.getOne); 
router.put("/:id", auth, postCtrl.update); 
router.delete("/:id", auth, postCtrl.delete); 

// END OF : ------------    PROFILE ROUTES   --------------------

module.exports = router;
