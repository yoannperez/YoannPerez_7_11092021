//                                         -------------------------------------------------------
//                                         --               DEFAULT CONTROLLER                  --
//                                         -------------------------------------------------------
// -----------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------

// Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.
require("dotenv").config();

const fs = require("fs");
const db = require("../../models");
const globalFunc = require("../../tools/func");


// ---------------------------------------------------------------------------
// ------------------------           CREATE          ------------------------
// ---------------------------------------------------------------------------

exports.create  = (req, res) => {
  console.log("Create");
    // db.Profile.create({
    //   description: req.body.description,
    //   UserId: req.body.UserId,
    // }).then((newProfile) => res.send(newProfile));
  };



// ---------------------------------------------------------------------------
// ------------------------           READ            ------------------------
// ---------------------------------------------------------------------------
exports.get  = (req, res) => {
  console.log("Get All");
    // db.Profile.findAll({         
    //       include:[db.User]
    // }).then((profile) => res.send(profile))
    // .catch((error) => res.status(404).json({ error }));
  };


// ---------------------------------------------------------------------------
// ------------------------           READ            ------------------------
// ---------------------------------------------------------------------------
exports.getOne  = (req, res) => {
  console.log("Get One");
    // db.Profile.findAll({
    //   where: { 
    //       UserId: req.params.id },
    //       include:[db.User]
    // }).then((profile) => res.send(profile))
    // .catch((error) => res.status(404).json({ error }));
  };

// ---------------------------------------------------------------------------
// ------------------------         UPDATE            ------------------------
// ---------------------------------------------------------------------------
exports.update  = (req, res) => {
  console.log("Update");
    // db.Profile.update({ ...req.body }, { where: { id: req.params.id } })
    //       .then(() => res.status(200).json({ message: "Modified!" }))
    //       .catch((error) => res.status(400).json({ error }));
  };



// ---------------------------------------------------------------------------
// ------------------------          DELETE           ------------------------
// ---------------------------------------------------------------------------

exports.delete  = (req, res) => {
  console.log("Delete");
    // db.Profile.destroy({ where: { id: req.params.id } })
    //       .then(function (data) {
    //         res.status(200).json({ message: "Profile Deleted"});
    //       })
    //       .catch((error) => {
    //         res.status(401).json({ message: "Something went wrong - User not found !" });
    //       });
};