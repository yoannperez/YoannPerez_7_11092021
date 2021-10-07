//                     -------------------------------------------------------
//                     --               COMMENTS CONTROLLER                 --
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
  console.log(req.body);
  db.Commentaire.create({
    ...req.body,
  })
    .then((commentaire) => res.send(commentaire))
    .catch((error) => res.status(401).json({ error: "Something went wrong" }));
};

//
// ---------------------------------------------------------------------------
// ------------------           READ BY POST ID           --------------------
// ---------------------------------------------------------------------------
exports.get = (req, res) => {
  db.Commentaire.findAll({
    where: {
      PostId: req.params.id,
    },
    include: {
      model: db.User,
      attributes: ["username"],
    },
  })
    .then((profile) => res.send(profile))
    .catch((error) => res.status(401).json({ error: "Something went wrong" }));
};

// ---------------------------------------------------------------------------
// ------------------------         UPDATE            ------------------------
// ---------------------------------------------------------------------------
exports.update = (req, res) => {
  console.log("Comments-Update");
  db.Commentaire.update({ ...req.body }, { where: { id: req.params.id } })
    .then(() => res.status(200).json({ message: "Modified!" }))
    .catch((error) => res.status(401).json({ error: "Something went wrong" }));
};

// ---------------------------------------------------------------------------
// ------------------------          DELETE           ------------------------
// ---------------------------------------------------------------------------

exports.delete = (req, res) => {
  db.Commentaire.destroy({ where: { id: req.params.id } })
    .then(function (data) {
      res.status(200).json({ message: "Comment Deleted" });
    })
    .catch((error) => {
      res.status(401).json({ message: "Something went wrong !" });
    });
};
