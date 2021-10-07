//                   -------------------------------------------------------
//                   --                  ROUTES FOR USERS                 --
//                   -------------------------------------------------------
// -------------------------------------------------------------------------
// -------------------------------------------------------------------------
// -------------------------------------------------------------------------

const express = require("express");
const router = express.Router();

//Import controller
const userCtrl = require("../controllers/user-controller");

// --------------- AUTH route -------------------

router.post("/signup", userCtrl.signup);
router.post("/signin", userCtrl.login);

//Export route
module.exports = router;