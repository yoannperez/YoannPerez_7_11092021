//                   -------------------------------------------------------
//                   --                 ROUTES FOR PROFILE                --
//                   -------------------------------------------------------
// -----------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------
const express = require("express");
const router = express.Router();
const db = require("../../models");

// // Call Middlewares
const auth = require("../../middleware/auth");
const multer = require("../../middleware/multer-config");

// // Import Controller
const profileCtrl = require ("../../controllers/profile-controller")


// ------------    PROFILE ROUTES   --------------------

// router.post("/", profileCtrl.create);  // Ajouter Auth Middleware // Ajouter Multer Middleware
// router.get("/", profileCtrl.get);  // Ajouter Auth Middleware // Ajouter Multer Middleware
// router.get("/:id", profileCtrl.getOne); // Ajouter Auth Middleware // Ajouter Multer Middleware
// router.put("/:id", profileCtrl.update); // Ajouter Auth Middleware // Ajouter Multer Middleware
// router.delete("/:id", profileCtrl.delete); // Ajouter Auth Middleware // Ajouter Multer Middleware

// END OF : ------------    PROFILE ROUTES   --------------------

module.exports = router;
