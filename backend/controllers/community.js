//                                         -------------------------------------------------------
//                                         --             Community CONTROLLER                  --
//                                         -------------------------------------------------------
// -----------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------

"use strict";
//--------------------------------------------------
// Call security modules needed for authentification
//--------------------------------------------------
// Token validation by JWT
const jwt = require("jsonwebtoken");
// Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.
require("dotenv").config();
// Call user & Communities model
const Community = require("../models/communities");
const User = require("../models/user");

// ---------------------------------------------------------------------------
// ------------------------      Create community     ------------------------
// ---------------------------------------------------------------------------

exports.create = (req, res) => {
  // -------- Find userid contained in the token -------------------
  const token = req.headers.authorization.split(" ")[1];
  // Use of verify function to decode token with the secret key
  const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
  // let get the user id contain in decoded Token
  const userId = decodedToken.userId;

  if (!req.body.name) {
    return res.status(403).json({ error: `You need to give a name to your community` });
  }

  // Let see if username is allready taken
  Community.findOne({ where: { name: req.body.name } }).then((community) => {
    // if user doesn't exist in database, return an error
    if (community) {
      return res.status(401).json({ error: `Community name already used!` });
    }
    Community.create({
      name: req.body.name,
      createdBy: userId,
      members: userId,
    })
      .then(function (data) {
        res.status(201).json({ message: "Community created" });

        // return res;
      })
      .catch((error) => {
        res.status(500).json({ error: "Bad request" });
      });
  });
};

// ---------------------------------------------------------------------------
// ------------------------ Get all communities ------------------------
// ---------------------------------------------------------------------------

exports.getAll = (req, res) => {
  Community.findAndCountAll()
    .then((community) => res.status(200).json(community.rows))
    .catch((error) => res.status(404).json({ error }));
};

// ---------------------------------------------------------------------------
// ------------------------ Get one community ------------------------
// ---------------------------------------------------------------------------

exports.getOne = (req, res) => {
  Community.findOne({ where: { id: req.params.id } })
    .then((community) => res.status(200).json(community))
    .catch((error) => res.status(404).json({ error }));
};

// ---------------------------------------------------------------------------
// ------------------------ Update one community ------------------------
// ---------------------------------------------------------------------------

exports.update = (req, res) => {
  // -------- Find userid contained in the token -------------------
  const token = req.headers.authorization.split(" ")[1];
  // Use of verify function to decode token with the secret key
  const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
  // let get the user id contain in decoded Token
  const userId = decodedToken.userId;

  Community.update({ ...req.body }, { where: { id: req.params.id } })
    .then(() => res.status(200).json({ message: "Community Modified!" }))
    .catch((error) => res.status(400).json({ error: "Something is wrong" }));
};

// ---------------------------------------------------------------------------
// ------------------------   Delete one community    ------------------------
// ---------------------------------------------------------------------------

exports.delete = (req, res) => {
  console.log("Coucou delete");

  // -------- Find userid contained in the token -------------------
  const token = req.headers.authorization.split(" ")[1];
  // Use of verify function to decode token with the secret key
  const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
  // let get the user id contain in decoded Token
  const userId = decodedToken.userId;

  User.findOne({ where: { id: userId } })

    .then((user) => {
      let root = user.isAdmin;

      Community.findOne({ where: { id: req.params.id } }).then((communitySaved) => {
        if (communitySaved.createdBy == userId || root == true) {
          Community.destroy({ where: { id: req.params.id } }).then(function (data) {
            res.status(200).json({ message: "Community Deleted" });
          });
        } else {
          res.status(405).json({ error: "Vous n'êtes pas autorisé à supprimer cette communauté !" });
        }
      });
    })
    .catch((error) => {
      res.status(404).json({ message: "Something went wrong" });
    });
};

// ---------------------------------------------------------------------------
// ------------------------   Subscribe community     ------------------------
// ---------------------------------------------------------------------------

exports.subscribe = (req, res) => {
  // -------- Find userid contained in the token -------------------
  const token = req.headers.authorization.split(" ")[1];
  // Use of verify function to decode token with the secret key
  const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
  // let get the user id contain in decoded Token
  const userId = decodedToken.userId;

  Community.findOne({ where: { id: req.params.id } }).then((community) => {
    let members = community.members;

    let array = Array.from(members.split(","));
    console.log(array);

    const index = array.indexOf('7');
    if (index > -1) {
      array.splice(index, 1);
    }

    // array.push('133')

    // let test = [3,4,5,6,7,8,9,99];
    // console.log(test)
    let tabtostring = array.toString();

    Community.update({ members: tabtostring }, { where: { id: req.params.id } })
      .then(() => res.status(200).json({ message: "Modified!" }))
      .catch((error) => res.status(400).json({ error }));
  });
};
