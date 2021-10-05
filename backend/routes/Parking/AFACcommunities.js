//                   -------------------------------------------------------
//                   --             ROUTES FOR COMMUNITIES                --
//                   -------------------------------------------------------
// -----------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------

const express = require("express");
const router = express.Router();

// Call Middlewares
const auth = require("../../middleware/auth");
// const multer = require("../middleware/multer-config");

//Import controller
const communityCtrl = require("../../controllers/Parking/community");

// --------------- Community routes -------------------
router.post("/", auth, communityCtrl.create);
router.get("/", auth, communityCtrl.getAll); 
router.get("/:id", auth, communityCtrl.getOne);  
router.put("/:id", auth, communityCtrl.update);
router.delete("/:id", auth, communityCtrl.delete);
router.post("/:id/subscribe", auth, communityCtrl.subscribe);

//Export route
module.exports = router;