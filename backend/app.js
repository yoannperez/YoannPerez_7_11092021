//                                         -------------------------------------------------------
//                                         --                EXPRESS APPLICATION                --
//                                         -------------------------------------------------------
//------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------

// Call modules
const express = require("express");
const path = require("path");
const db = require("./models");

// Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.
require("dotenv").config();

/// -------------- CALL ROUTES FILES --------------------------
const authRoutes = require("./routes/auth-routes");
const userRoutes = require("./routes/user-routes");
const postRoutes = require("./routes/post-routes");
const commentsRoutes = require("./routes/comments-routes");
/// END OF :------- CALL ROUTES FILES --------------------------

// Launch Xpress
const app = express();

// CORS Definition
app.use((req, res, next) => {
  // Accpet connexions from everywhere
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Add authorized headers
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
  // Add authorized Methods
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  next();
});

// Set static folder for multer, '/images' is a static folder,
// a root's subfolder used when we receive a /images request
app.use("/images", express.static(path.join(__dirname, "images")));

// Define JSON Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// SYNC SEQUELIZE
db.sequelize.sync();

/// -------------- DEFINE ROUTES --------------------------

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/comments", commentsRoutes);
app.use("/api/posts", postRoutes);


// app.use("/api/community", communitiesRoutes);
/// END OF : ----- DEFINE ROUTES --------------------------

module.exports = app;
