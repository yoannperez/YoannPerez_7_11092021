//                   -------------------------------------------------------
//                   --                  ROUTES FOR USERS                 --
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

// //Import controller
const userCtrl = require("../controllers/user-controller");

// // --------------- USERS route -------------------
router.get("/", auth, userCtrl.getAll); //
router.get("/:id", auth, userCtrl.getOne); //
router.delete("/delete/:id", auth, userCtrl.delete);
router.put("/:id", auth, multer, userCtrl.updateUser);


module.exports = router;
