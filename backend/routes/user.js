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

// --------------- USERS route -------------------

router.delete("/delete/:id", userCtrl.delete);
router.get("/get", userCtrl.getAll);

// router.get("/", auth, sauceCTRL.getSauce);
// router.get("/:id", auth, sauceCTRL.getOneSauce);
// router.post("/", auth, multer, sauceCTRL.createSauce);
// router.put("/:id", auth, multer, sauceCTRL.modifySauce);
// router.delete("/:id", auth, sauceCTRL.deleteSauce);
// router.post("/:id/like", auth, sauceCTRL.likeSauce);


//Export route
module.exports = router;