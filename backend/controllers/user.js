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
require("dotenv").config();

// Call user model
const User = require("../models/user");
const controller = {};

//import model
// const Countries = require("./models/Countries");
const { Op } = require("sequelize");

exports.index = (req, res) => {
  const data = {
    name: "John Doe",
    age: 20,
    city: "will never die",
  };
  res.json(data);
};

// ------------------------ Création d'un utilisateur ------------------------
// Create a user function
exports.signup = async (req, res, next) => {
  bcrypt
    // Create an encrypt hash from user's password, salted 10X
    .hash(req.body.password, 10)
    // With Promise, create user from userSchema, add email from req, then add hash as password
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      try {
        const response = User.create({
          name: req.body.name,
          email: req.body.email,
          password: hash,
        })
          .then(function (data) {
            const res = {
              succes: true,
              message: "Created successful",
              data: data,
            };
            return res;
          })
          .catch((error) => {
            const res = { success: false, error: error };
            return res;
          });

        res.json(response);
      } catch (error) {
        console.log(error);
      }
    })
    // if bcrypt has a problem, send an error server status code
    .catch((error) => res.status(500).json({ error }));
};

// ----------------------------------------------------------------
exports.create = async (req, res) => {
  try {
    const response = await User.create({
      name: "John Doe",
      email: "john.doe@jojo.com",
      password: "AZERTY",
      // phone: "12345678",
      // countryCode: "US",
    })
      .then(function (data) {
        const res = {
          succes: true,
          message: "Created successful",
          data: data,
        };
        return res;
      })
      .catch((error) => {
        const res = { success: false, error: error };
        return res;
      });

    res.json(response);
  } catch (error) {
    console.log(error);
  }
};

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

// //Création d'un utilisateur

// controller.create = async (req, res) => {
//   try {
//     const response = await Customers.create({
//       name: "John Smith 1",
//       email: "john@john.john",
//       address: "Avenidad de Guimar",
//       phone: "12345678",
//       countryCode: "US",
//     })
//       .then(function (data) {
//         const res = {
//           succes: true,
//           message: "Created successful",
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

// // Delete one customer
// controller.delete = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const response = await Customers.destroy({
//       where: { id: id },
//     })
//       .then(function (data) {
//         const res = { success: true, data: data, message: "Delected successfull" };
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

// module.exports = controller;
