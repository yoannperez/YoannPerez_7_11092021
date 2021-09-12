//                                         -------------------------------------------------------
//                                         --                    SAUCES SCHEMA                  --
//                                         -------------------------------------------------------

// Need mongoose module
const mongoose = require('mongoose');

// Schema definition
const sauceSchema = mongoose.Schema({
  userId : { type: String, required: true },
  name : { type: String, required: true },
  manufacturer : { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number, required: false },
  dislikes: { type: Number, required: false },
  usersLiked: { type: [""], required: false },
  usersDisliked:{ type: [""], required: false },
});

// Export Schema 
module.exports = mongoose.model('Sauce', sauceSchema);