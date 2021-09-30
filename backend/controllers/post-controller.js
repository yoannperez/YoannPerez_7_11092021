//                                         -------------------------------------------------------
//                                         --                 POSTS CONTROLLER                  --
//                                         -------------------------------------------------------
// -----------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------

// Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.
require("dotenv").config();

const fs = require("fs");
const db = require("../models");
const globalFunc = require("../tools/func");

// ---------------------------------------------------------------------------
// ------------------------           CREATE          ------------------------
// ---------------------------------------------------------------------------

exports.create = (req, res) => {
  db.Post.create({
    text: req.body.text,
    UserId: req.body.UserId,
  }).then((newPost) => res.send(newPost));
};

// ---------------------------------------------------------------------------
// ------------------------           READ            ------------------------
// ---------------------------------------------------------------------------
exports.get = (req, res) => {
  db.Post.findAll({
    include: [db.User, db.Commentaire],
  }).then((post) => {
    res.send(post);
  });
};

// ---------------------------------------------------------------------------
// ------------------------           READ            ------------------------
// ---------------------------------------------------------------------------
exports.getOne = (req, res) => {
  db.Post.findAll({
    where: {
      UserId: req.params.id,
    },
    include: [db.User, db.Commentaire],
  }).then((post) => res.send(post));
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
