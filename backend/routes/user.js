//                   -------------------------------------------------------
//                   --                  ROUTES FOR USERS                 --
//                   -------------------------------------------------------
// -----------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------

const express = require("express");
const router = express.Router();

// Call Middlewares
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

//Import controller
const userCtrl = require("../controllers/user");

// --------------- USERS route -------------------
router.get("/", auth, userCtrl.getAll); // 
router.get("/:id", auth, userCtrl.getOne); // 
router.delete("/delete/:id", auth, userCtrl.delete);
router.put("/:id", auth, multer, userCtrl.updateUser);

//Export route
module.exports = router;