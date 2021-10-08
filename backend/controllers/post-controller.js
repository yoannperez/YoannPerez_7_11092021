//                     -------------------------------------------------------
//                     --                 POSTS CONTROLLER                  --
//                     -------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------

require("dotenv").config();

const fs = require("fs");
const db = require("../models");
const globalFunc = require("../tools/func");

// ---------------------------------------------------------------------------
// ------------------------           CREATE          ------------------------
// ---------------------------------------------------------------------------

exports.create = (req, res) => {
 
  const userObject = req.file // if req.file exists
    ? {
        ...JSON.parse(req.body.post),
        imageUrl: `http://localhost:3000/images/${req.file.filename}`,
      }
    : { ...JSON.parse(req.body.post),};
  
  db.Post.create(userObject, { where: { id: req.params.id } })
    .then(() => res.status(200).json({ message: "Post Created" }))
    .catch((error) => res.status(400).json({ message: "Tu fais de la merde !" }));
};

// ---------------------------------------------------------------------------
// ------------------------           READ            ------------------------
// ---------------------------------------------------------------------------
exports.get = (req, res) => {
  db.Post.findAll({
    // include: [db.User, db.Commentaire],
    include: [
      db.Commentaire,
      {
        model: db.User,
        attributes: ["username"],
      },
    ],
  })
    .then((post) => {
      res.send(post);
    })
    .catch((error) => {
      res.status(400).json({ message: "Something went wrong" });
    });
};

// ---------------------------------------------------------------------------
// ------------------------           READ            ------------------------
// ---------------------------------------------------------------------------
exports.getOne = (req, res) => {
  db.Post.findOne({
    where: {
      id: req.params.id,
    },
    // include: [db.User, db.Commentaire],
    include: {
      model: db.User,
      attributes: ["username"],
    },
  })
    .then((post) => {
      res.send(post);
    })
    .catch((e) => {
      res.status(400).json({ message: "Something went wrong" });
    });
};

// ---------------------------------------------------------------------------
// ------------------------         UPDATE            ------------------------
// ---------------------------------------------------------------------------
exports.update = (req, res) => {
  db.Post.update({ ...req.body }, { where: { id: req.params.id } })
    .then(() => res.status(200).json({ message: "Modified!" }))
    .catch((error) => res.status(400).json({ error: "Not Authorized !" }));
};

// ---------------------------------------------------------------------------
// ------------------------          DELETE           ------------------------
// ---------------------------------------------------------------------------

exports.delete = (req, res) => {
  db.Post.destroy({ where: { id: req.params.id } })
    .then(function (data) {
      res.status(200).json({ message: "Post destroyed" });
    })
    .catch((error) => {
      res.status(401).json({ message: "Something went wrong !" });
    });
};
