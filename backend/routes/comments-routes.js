//                   -------------------------------------------------------
//                   --                 ROUTES FOR COMMENTS               --
//                   -------------------------------------------------------
// -----------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------
const express = require("express");
const router = express.Router();
const db = require("../models");

// // Call Middlewares
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

// // Import Controller
const commentsCtrl = require ("../controllers/comments-controller")


// ------------    PROFILE ROUTES   --------------------

router.post("/", auth, commentsCtrl.create);  // Ajouter Auth Middleware // Ajouter Multer Middleware
router.get("/:id", auth, commentsCtrl.get);  // Ajouter Auth Middleware // Ajouter Multer Middleware
router.put("/:id",auth, commentsCtrl.update); // Ajouter Auth Middleware // Ajouter Multer Middleware
router.delete("/:id", auth, commentsCtrl.delete); // Ajouter Auth Middleware // Ajouter Multer Middleware

// END OF : ------------    PROFILE ROUTES   --------------------

module.exports = router;
