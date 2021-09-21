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
// // Crytping password with bcrypt
// const bcrypt = require("bcrypt");
// // Token validation by JWT
// const jwt = require("jsonwebtoken");
// Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.
require("dotenv").config();
// Call user model
const User = require("../models/communities");

// ---------------------------------------------------------------------------
// ------------------------ Create community ------------------------
// ---------------------------------------------------------------------------

exports.create = (req, res) => {
  console.log("Coucou Create");
};

// ---------------------------------------------------------------------------
// ------------------------ Get all communities ------------------------
// ---------------------------------------------------------------------------

exports.getAll = (req, res) => {
  console.log("Coucou GetALL");
};

// ---------------------------------------------------------------------------
// ------------------------ Get one community ------------------------
// ---------------------------------------------------------------------------

exports.getOne = (req, res) => {
  console.log("Coucou GetOne");
};

// ---------------------------------------------------------------------------
// ------------------------ Update one community ------------------------
// ---------------------------------------------------------------------------

exports.update = (req, res) => {
  console.log("Coucou update");
};

// ---------------------------------------------------------------------------
// ------------------------ Update one community ------------------------
// ---------------------------------------------------------------------------

exports.delete = (req, res) => {
  console.log("Coucou delete");
};
