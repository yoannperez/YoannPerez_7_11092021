//                   -------------------------------------------------------
//                   --                 ROUTES FOR COMMENTS               --
//                   -------------------------------------------------------
// -------------------------------------------------------------------------
// -------------------------------------------------------------------------
// -------------------------------------------------------------------------
const express = require("express");
const router = express.Router();
const db = require("../models");

// // Call Middlewares
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

// // Import Controller
const commentsCtrl = require ("../controllers/comments-controller")


// ------------    PROFILE ROUTES   --------------------

router.post("/", auth, commentsCtrl.create); 
router.get("/:id", auth, commentsCtrl.get); 
router.put("/:id",auth, commentsCtrl.update); 
router.delete("/:id", auth, commentsCtrl.delete); 

// END OF : ------------    PROFILE ROUTES   --------------------

module.exports = router;
