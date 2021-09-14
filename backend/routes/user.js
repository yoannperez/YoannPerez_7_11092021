//                                         -------------------------------------------------------
//                                         --                 ROUTES FOR USERS                --
//                                         -------------------------------------------------------

const express = require("express");
const router = express.Router();

//Import controller
const userCtrl = require("../controllers/user");

//create route
// router.get("/index", userCtrl.index);
// router.get("/create", userCtrl.create);
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
// router.get("/list", userCtrl.list);
// router.get("/countries", userCtrl.listCountries);

// router.get("/update", userCtrl.update);
// router.get("/get/:id", userCtrl.get);
// router.get("/delete/:id", userCtrl.delete);

//Export route
module.exports = router;