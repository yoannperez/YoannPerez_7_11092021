const express = require("express");
const router = express.Router();
const db = require("../models");

router.post("/new", (req, res) => {
  db.Post.create({
    text: req.body.text,
    UserId: req.body.UserId,
  }).then(newPost => res.send(newPost));
});

router.get("/find/:id", (req, res) => {
  db.Post.findAll({
    where: { 
        UserId: req.params.id },
        include:[db.User]
  }).then((post) => res.send(post));
});

router.get("/find", (req, res) => {
  db.Post.findAll({
    include:[db.User]
  }).then((post) => res.send(post));
});

router.put("/:id", (req, res) => {
  db.Post.update({ ...req.body }, { where: { id: req.params.id } })
          .then(() => res.status(200).json({ message: "Modified!" }))
          .catch((error) => res.status(400).json({ error }));
  
});

router.delete("/:id", (req, res) => {
  
  db.Post.destroy({ where: { id: req.params.id } })
            .then(function (data) {
              res.status(200).json({ message: "Post destroyed"});
            })
            .catch((error) => {
              res.status(401).json({ message: "Something went wrong !" });
            });
})


module.exports = router;
