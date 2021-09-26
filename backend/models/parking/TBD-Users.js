//                                         -------------------------------------------------------
//                                         --                   USER SCHEMA                     --
//                                         -------------------------------------------------------

// Modules needed
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

//Schema definition
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Using uniqueValidator plugin to prevent 2 users registring with the same email
userSchema.plugin(uniqueValidator);

// Export schema
module.exports = mongoose.model("User", userSchema);
