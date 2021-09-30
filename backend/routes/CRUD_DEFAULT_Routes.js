//                   -------------------------------------------------------
//                   --                 ROUTES FOR DEFAULT                --
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
const DEFAULTCtrl = require ("../controllers/profile-controller")


// ------------    PROFILE ROUTES   --------------------

router.post("/", DEFAULTCtrl.create);  // Ajouter Auth Middleware // Ajouter Multer Middleware
router.get("/", DEFAULTCtrl.get);  // Ajouter Auth Middleware // Ajouter Multer Middleware
router.get("/:id", DEFAULTCtrl.getOne); // Ajouter Auth Middleware // Ajouter Multer Middleware
router.put("/:id", DEFAULTCtrl.update); // Ajouter Auth Middleware // Ajouter Multer Middleware
router.delete("/:id", DEFAULTCtrl.delete); // Ajouter Auth Middleware // Ajouter Multer Middleware

// END OF : ------------    PROFILE ROUTES   --------------------

module.exports = router;
