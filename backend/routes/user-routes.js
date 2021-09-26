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
// const auth = require("../middleware/auth");
// const multer = require("../middleware/multer-config");

// //Import controller
// const userCtrl = require("../controllers/user");

// // --------------- USERS route -------------------
// router.get("/", auth, userCtrl.getAll); // 
// router.get("/:id", auth, userCtrl.getOne); // 
// router.delete("/delete/:id", auth, userCtrl.delete);
// router.put("/:id", auth, multer, userCtrl.updateUser);

router.post("/new", (req, res) => {
  db.User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,

  }).then((newUser) => res.send(newUser));
});

router.get("/all", (req, res) => {
  db.User.findAll({
    include: [db.Profile, db.Post],
  }).then((allUsers) => res.send(allUsers));
});

module.exports = router;
