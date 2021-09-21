//                                         -------------------------------------------------------
//                                         --                EXPRESS APPLICATION                --
//                                         -------------------------------------------------------


// Call modules
const express = require("express");
const path = require('path');


// Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.
require ('dotenv').config();

// Call Routes files
const authRoutes = require ('./routes/auth')
const userRoutes = require ('./routes/user')
// const userRoutes = require("./routes/user");
// const sauceRoutes = require("./routes/sauces");

// Launch Xpress
const app = express();



// CORS Definition  
app.use((req, res, next) => {
  // Accpet oonnexions from everywhere
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Add authorized headers
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
  // Add authorized Methods
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  next();
});

// Set static folder for multer, '/images' is a static folder,
// a root's subfolder used when we receive a /images request
app.use('/images', express.static(path.join(__dirname, 'images')));

// Define JSON Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Define Routes
// Routes to user identification
app.use("/api/auth", authRoutes); 
app.use("/api/user", userRoutes); 
// app.use("/api/sauces", sauceRoutes); // Routes to sauces

module.exports = app;
