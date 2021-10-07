//                                         -------------------------------------------------------
//                                         --                  USER CONTROLLER                  --
//                                         -------------------------------------------------------
// -----------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------

"use strict";
//--------------------------------------------------
// Call security modules needed for authentification
//--------------------------------------------------
// Crytping password with bcrypt
const bcrypt = require("bcrypt");
// Token validation by JWT
const jwt = require("jsonwebtoken");
// Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.
require("dotenv").config();
// Call user model
// const User = require("../models/user");
const fs = require("fs");
const db = require("../models");
const globalFunc = require("../tools/func");


// ---------------------------------------------------------------------------
// ------------------------ Création d'un utilisateur ------------------------
// ---------------------------------------------------------------------------

exports.signup = (req, res, next) => {
  let isAdmin = false;
  // Let see is req contains password
  if (!req.body.password) {
    return res.status(401).json({ error: `Password not valid` });
  }
  // Let see is req contains username
  if (!req.body.username) {
    return res.status(401).json({ error: `Need to enter a valid user name` });
  }
  // Let see is req contains email
  if (!req.body.email) {
    return res.status(401).json({ error: `Need to enter a valid email adress` });
  }

  // Let see if username is allready taken
  db.User.findOne({ where: { username: req.body.username } }).then((user) => {
    // if user doesn't exist in database, return an error
    if (user) {
      return res.status(401).json({ error: `Username already used!` });
    }
  });

  db.User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      // if user doesn't exist in database, return an error
      if (user) {
        return res.status(401).json({ error: `Email already exists in database!` });
      }
      // if it's the first user, set admin true
      db.User.count().then((user) => {
        if (user === 0) {
          isAdmin = true;
        }
      });

      bcrypt
        // Create an encrypt hash from user's password, salted 10X
        .hash(req.body.password, 10)
        // With Promise, create user from userSchema, add email from req, then add hash as password
        .then((hash) => {
          const user = new db.User({
            email: req.body.email,
            password: hash,
          });
          try {
            const response = db.User.create({
              username: req.body.username,
              email: req.body.email,
              password: hash,
              isAdmin: isAdmin,
            })
              .then(function (data) {
                res.status(201).json({ message: "User created" });

                // return res;
              })
              .catch((error) => {
                const res = { success: false, error: error };
                return res;
              });
            res.status(201).json({ message: "User created" });
            // res.json(response);
          } catch (error) {
            console.log(error);
          }
        })
        // if bcrypt has a problem, send an error server status code
        .catch((error) => res.status(500).json({ error: "Bad request" }));
    })
    .catch((error) => res.status(500).json({ error: "Very Bad request, need to verify message !" }));
};

// ---------------------------------------------------------------------------
// -------------------------  Login d'un utilisateur  ------------------------
// ---------------------------------------------------------------------------
exports.login = (req, res) => {
  // Check in database if user exists
  db.User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      // if user doesn't exist in database, return an error
      if (!user) {
        return res.status(401).json({ error: `User doesn't exist in database!` }); // identifiants non valide
      }
      // if user exists, we need to verify password
      bcrypt
        // Bcrypt can compare two different Hashes, and determin if they come from the same password
        .compare(req.body.password, user.password)

        .then((valid) => {
          // In case password is not valid
          if (!valid) {
            return res.status(401).json({ error: "Wrong password !" }); // identifiants non valide
          }
          // In case password matches with database, we send a response 200, the user id ans the Token created with jsonwebtoken
          res.status(200).json({
            userId: user.id,
            imageUrl : user.imageUrl,
            token: jwt.sign(
              // Token created with userId
              { userId: user.id },
              // the private key stored in .env file
              process.env.TOKEN_KEY,
              // Valid for 24h
              { expiresIn: "24h" }
            ),
            email:user.email,
            username:user.username,
          });
        })
        .catch((error) => res.status(500).json({ error: "bcrypt error, check password !" }));
    })
    .catch((error) => res.status(500).json({ error: "Server error, POST message invalid, check email !" }));
};

// --------------------------------------------------------------------------
// -------------------------- GET ALL USERS  --------------------------------
// --------------------------------------------------------------------------

exports.getAll = (req, res) => {
  db.User.findAndCountAll(
    {include:[db.Post, db.Commentaire]}
    )
    .then((users) => res.status(200).json(users.rows))
    .catch((error) => res.status(404).json({ error }));
};

// --------------------------------------------------------------------------
// -------------------------- GET ONE USER  --------------------------------
// --------------------------------------------------------------------------

exports.getOne = (req, res) => {
  // -------- Find userid contained in the token -------------------
  const userId = globalFunc.whatId(req);
  console.log("Id from token : " + userId);

  db.User.findOne({ where: { id: userId } }).then((user) => {
    let root = user.isAdmin;
    if (req.params.id == userId || root == true) {
      db.User.findOne({ 
        where: { 
        id: req.params.id },
        attributes: {
          exclude: ['password']
      },
        
       })
        .then((user) =>
          res.status(200).json({
            user
            // id: user.id,
            // username: user.username,
            // email: user.email,
            // password: user.password,
            // description:user.description,
            // imageUrl: user.imageUrl,
            // createdAt: user.createdAt,
            // updatedAt: user.updatedAt,
          })
        )
        .catch((error) => res.status(404).json({ error }));
    } else {
      res.status(404).json({ error: "You are not authorized !" });
    }
  });
};

// ---------------------------------------------------------------------------
// -----------------------------  Delete User  -------------------------------
// ---------------------------------------------------------------------------

exports.delete = (req, res) => {
  // -------- Find userid contained in the token -------------------
  const userId = globalFunc.whatId(req);
  console.log("Id from token : " + userId);

  db.User.findOne({ where: { id: userId } })

    .then((user) => {
      let root = user.isAdmin;

      if (req.params.id == userId || root == true) {
        console.log(req.params.id);
        db.User.destroy({ where: { id: req.params.id } })
          .then(function (data) {
            res.status(200).json({ token: jwt.sign({ userId: user.id }, process.env.TOKEN_KEY, { expiresIn: "1ms" }), message: "User Deleted" });
          })
          .catch((error) => {
            res.status(401).json({ message: "Something went wrong - User not found !" });
          });
      } else {
        res.status(404).json({ error: "Vous n'êtes pas autorisé à supprimer ce compte !" });
      }
    })
    .catch((error) => {
      res.status(404).json({ message: "Something went wrong" });
    });
};

// Vérifier qu'on ne peut pas supprimer un compte admin existant ==> findAll

// ---------------------------------------------------------------------------
// -----------------------------  UPDATE User  -------------------------------
// ---------------------------------------------------------------------------

exports.updateUser = (req, res) => {
  // -------- Find userid contained in the token -------------------
  const userId = globalFunc.whatId(req);
  console.log("Id from token : " + userId);
  
  db.User.findOne({ where: { id: userId } })
  
  .then((user) => {
    
    let root = user.isAdmin;
    
    if (req.params.id == userId || root == true) {
      
        console.log(req.body)
        const userObject = req.file
          ? // if req.file exists
            {
              // ...JSON.parse(req.body.user), 
              // imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
              imageUrl: `http://localhost:3000/images/${req.file.filename}`,
            }
          : // In case req.file doesn't exist
            { ...req.body};
            

        // then update User with userObjet informations
        
        db.User.update({ ...userObject }, { where: { id: req.params.id } })
          .then(() => res.status(200).json({ message: "Modified!" }))
          .catch((error) => res.status(400).json({ error }));
      } else {
        res.status(404).json({ error: "Vous n'êtes pas autorisé à Modifier ce compte !" });
      }
    })
    .catch((error) => {
      res.status(404).json({ message: "Something went wrong" });
    });
};

// --------------------------------------------------------------------------
// -------------------------------  PARKING  --------------------------------
// --------------------------------------------------------------------------

// controller.list = async (req, res) => {
//   try {
//     const response = await Customers.findAll({
//       // include : [Countries]
//       // include: [
//       //   {
//       //     model: Countries,
//       //     where: { name: "Colombia" },
//       //   }]
//       include: [
//         {
//           model: Countries,
//           attributes: ["name"],
//         },
//       ],
//     })
//       .then(function (data) {
//         const res = { success: true, message: "Load successful", data: data };
//         return res;
//       })
//       .catch((error) => {
//         const res = { success: false, error: error };
//         return res;
//       });

//     return res.json(response);
//   } catch (error) {
//     console.log("Error controller.list");
//     console.log(error);
//   }
// };

// //Filtrer par pays
// controller.listCountries = async (req, res) => {
//   try {
//     const response = await Countries.findAll({
//       include: ["getCustomers"],
//       // include: [
//       //   {
//       //     model: getCustomers,
//       //     attributes: ["name"],
//       //   },
//       // ],
//     })

//       .then(function (data) {
//         const res = { success: true, message: "Load successful", data: data };
//         return res;
//       })
//       .catch((error) => {
//         const res = { success: false, error: error };
//         return res;
//       });

//     return res.json(response);
//   } catch (error) {
//     console.log("Error controller.list");
//     console.log(error);
//   }
// };

// //mise à jour d'un utilisateur
// controller.update = async (req, res) => {
//   try {
//     const idCustomer = 3;
//     const response = await Customers.update(
//       {
//         name: "This is my correction",
//         email: "email@email.com",
//         address: "Avenidad de News",
//         phone: "187654321",
//       },
//       {
//         where: {
//           id: idCustomer,
//         },
//       }
//     )
//       .then(function (data) {
//         const res = {
//           succes: true,
//           message: "Update successful",
//           data: data,
//         };
//         return res;
//       })
//       .catch((error) => {
//         const res = { success: false, error: error };
//         return res;
//       });
//     res.json(response);
//   } catch (error) {
//     console.log(error);
//   }
// };

// // Get one customer
// controller.get = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const response = await Customers.findAll({
//       where: { id: id },
//       //   where:{
//       //       name:{
//       //           [Op.like]: "%This%"
//       //       }
//       //   }
//     })
//       .then(function (data) {
//         const res = { succes: true, data: data };
//         return res;
//       })
//       .catch((error) => {
//         const res = { success: false, error: error };
//         return res;
//       });
//     res.json(response);
//   } catch (error) {
//     console.log(error);
//   }
// };
