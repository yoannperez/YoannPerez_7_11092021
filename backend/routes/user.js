//                   -------------------------------------------------------
//                   --                  ROUTES FOR USERS                 --
//                   -------------------------------------------------------
// -----------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------

const express = require("express");
const router = express.Router();

//Import controller
const userCtrl = require("../controllers/user");

//create route
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.delete("/delete/:id", userCtrl.delete);
router.get("/get", userCtrl.getAll);

// router.get("/get/:id", userCtrl.get);

// router.get("/update", userCtrl.update);

//Export route
module.exports = router;