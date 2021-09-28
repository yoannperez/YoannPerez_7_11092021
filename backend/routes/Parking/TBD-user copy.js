//                                         -------------------------------------------------------
//                                         --                 ROUTES FOR USERS                --
//                                         -------------------------------------------------------

// Call modules
const express = require("express");
const router = express.Router();

// Call controller
const userCtrl = require("../controllers/user");

// Routes
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);

// Export module
module.exports = router;
