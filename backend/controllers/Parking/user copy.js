//                                         -------------------------------------------------------
//                                         --                  USER CONTROLLER                  --
//                                         -------------------------------------------------------


// Call security modules needed for authentification
//--------------------------------------------------
// Crytping password with bcrypt
const bcrypt = require("bcrypt");
// Token validation by JWT
const jwt = require("jsonwebtoken");
// Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.
require ('dotenv').config();

// Call user model
const User = require("../models/Users");


// Create a user function
exports.signup = (req, res, next) => {
  bcrypt
    // Create an encrypt hash from user's password, salted 10X
    .hash(req.body.password, 10)
    // With Promise, create user from userSchema, add email from req, then add hash as password
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      user
        // Save into MongoDB Database
        .save()
        // If everything's fine, send a 201 status code
        .then(() => res.status(201).json({ message: "User created !" }))
        // If there's a problem, return a 400 status code
        .catch((error) => res.status(400).json({ error }));
    })
    // if bcrypt has a problem, send an error server status code
    .catch((error) => res.status(500).json({ error }));
};

// Login function
exports.login = (req, res, next) => {
  // Check in database if user exists
  User.findOne({ email: req.body.email })
    .then((user) => {
      // if user doesn't exist in database, return an error
      if (!user) {
        return res.status(401).json({ error: "User not found !" });
      }
      // if user exists, we need to verify password
      bcrypt
        // Bcrypt can compare two different Hashes, and determin if they come from the same password
        .compare(req.body.password, user.password)

        .then((valid) => {
          // In case password is not valid
          if (!valid) {
            return res.status(401).json({ error: "Wrong password !" });
          }
          // In case password matches with database, we send a response 200, the user id ans the Token created with jsonwebtoken
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              // Token created with userId
              { userId: user._id },
              // the private key stored in .env file
              process.env.TOKEN_KEY,
              // Valid for 24h
              {expiresIn: '24h'}
              ),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
