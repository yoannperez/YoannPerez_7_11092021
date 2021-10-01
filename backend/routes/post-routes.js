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
router.post("/new", auth, postCtrl.create); // Ajouter Auth Middleware
router.get("/find", auth, postCtrl.get); // Ajouter Auth Middleware
router.get("/find/:id", auth, postCtrl.getOne); // Ajouter Auth Middleware
router.put("/:id", auth, postCtrl.update); // Ajouter Auth Middleware
router.delete("/:id", auth, postCtrl.delete); // Ajouter Auth Middleware

// END OF : ------------    PROFILE ROUTES   --------------------

module.exports = router;
