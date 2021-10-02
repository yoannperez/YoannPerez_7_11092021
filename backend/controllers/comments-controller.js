//                                         -------------------------------------------------------
//                                         --               COMMENTS CONTROLLER                 --
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
  // console.log("Comments-Create");
  console.log(req.body);
  db.Commentaire.create({
    ...req.body
    // commentaire: req.body.commentaire,
    // UserId: req.body.UserId,
    // PostId: req.body.PostId,
  }).then((commentaire) => res.send(commentaire))
  .catch((error) => res.status(400).json({ error : "Not Authorized !"}));
};

//
// ---------------------------------------------------------------------------
// ------------------------           READ            ------------------------
// ---------------------------------------------------------------------------
exports.get = (req, res) => {
  // console.log("Comments-Get All");
  db.Commentaire.findAll({
    where: {
            PostId: req.params.id },
            
  }).then((profile) => res.send(profile))
  .catch((error) => res.status(404).json({ error }));
};

// ---------------------------------------------------------------------------
// ------------------------           READ            ------------------------
// ---------------------------------------------------------------------------
exports.getOne = (req, res) => {
  console.log("Comments-Get One");
  // db.Commentaire.findAll({
  //   where: {
  //       UserId: req.params.id },
  //       include:[db.User]
  // }).then((profile) => res.send(profile))
  // .catch((error) => res.status(404).json({ error }));
};

// ---------------------------------------------------------------------------
// ------------------------         UPDATE            ------------------------
// ---------------------------------------------------------------------------
exports.update = (req, res) => {
  console.log("Comments-Update");
  db.Commentaire.update({ ...req.body }, { where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: "Modified!" }))
        .catch((error) => res.status(400).json({ error }));
};

// ---------------------------------------------------------------------------
// ------------------------          DELETE           ------------------------
// ---------------------------------------------------------------------------

exports.delete = (req, res) => {
  console.log("Comments-Delete");
  // db.Commentaire.destroy({ where: { id: req.params.id } })
  //       .then(function (data) {
  //         res.status(200).json({ message: "Profile Deleted"});
  //       })
  //       .catch((error) => {
  //         res.status(401).json({ message: "Something went wrong - User not found !" });
  //       });
};
