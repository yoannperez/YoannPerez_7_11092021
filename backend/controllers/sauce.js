//                                         -------------------------------------------------------
//                                         --                  SAUCES CONTROLLER                --
//                                         -------------------------------------------------------


// required modules, fs module is requested to delete image file when deleting a sauce
const Sauce = require("../models/sauces");
const fs = require("fs");


// --------------- Calling all sauces ----------------
exports.getSauce = (req, res, next) => {
  Sauce.find()
    .then((sauces) => res.status(201).json(sauces))
    .catch((error) => res.status(404).json({ error }));
};

// ---------------- Calling one sauce ----------------
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
};

// ---------------- Create a sauce -------------------
exports.createSauce = (req, res, next) => {
  // We need informaton (from frontend) in form-data format (not in JSON)
  const sauceObject = JSON.parse(req.body.sauce);
  // Remove wrong id created by front end, we don't need it
  delete sauceObject._id;

  // Create a constant sauce from sauceSchema
  const sauce = new Sauce({
    // Copying all informations from the request
    ...sauceObject,
    // Add image url informations
    // ${req.protocol} returns used protocol (http)
    // ${req.get("host") resolve server adress (127.0.0.1:300 || localhost:3000)
    // /images/ is static folder defined in express application
    // ${req.file.filename} is filename defined by multer middleware in multer-config.js 
    imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
    // Finally initiate other parameters
    likes: 0,
    dislikes: 0,
    usersLiked: [""],
    usersDisliked: [""],
  });
  sauce
    // save datas in database
    .save()
    // if OK, send 201 status code
    .then(() => res.status(201).json({ message: "Sauce created !" }))
    // if there's an error, send 400 status code
    .catch((error) => res.status(400).json({ error }));
};

// ---------------- Modify sauce ----------------------
exports.modifySauce = (req, res, next) => {
  // creating sauceObjet
  const sauceObject = req.file
    // if req.file exists
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
      }
    // In case req.file doesn't exist
    : { ...req.body };
  
  // then update Sauce with sauceObjet informations
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Modified!" }))
    .catch((error) => res.status(400).json({ error }));
};

// ---------------- Delete sauce ----------------------
exports.deleteSauce = (req, res, next) => {
  // Use id parameter from request
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      // Split '/images/' from imageUrl and use 2nd part to get filename
      const filename = sauce.imageUrl.split("/images/")[1];
      // use unlink function from fs package in other to delete image file from server's storage
      fs.unlink(`images/${filename}`, () => {
        // Callback used to delete entry from database
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Sauce deleted !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

// // ---------------- Liking sauce ----------------------
exports.likeSauce = (req, res, next) => {
  // Get like information from request
  let like = req.body.like;
  // We can have 3 cases with this value : 1, 0, -1
  switch (like) {
// IF like = 1, user like this sauce.
    case 1:
      Sauce.updateOne(
        // Get sauce id
        { _id: req.params.id },
        {
          $inc: { likes: 1 }, // MongoDB function du increment value
          // User Id must be added to usersLiked Array.
          $push: { usersLiked: req.body.userId }, // MongoDB function used to add a userId
        }
      )
        .then(() => res.status(200).json({ message: "Modified!" }))
        .catch((error) => res.status(400).json({ error }));
      

      break;

// If like = 0, user cancel his like or his dislike.
    case 0:
      // Get sauce id
      Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
          // In case user used to like the sauce
          if (sauce.usersLiked.find((user) => user === req.body.userId)) {
            Sauce.updateOne(
              { _id: req.params.id },
              {
                $inc: { likes: -1 }, // MongoDB function du increment value
                // User Id must be removed from usersLiked Array.
                $pull: { usersLiked: req.body.userId }, // MongoDB function used to remove a userId
              }
            )
              .then(() => {
                res.status(200).json({ message: "Modified!" });
              })
              .catch((error) => {
                res.status(400).json({ error: error });
              });
          }
          // In case user used to dislike the sauce
          if (sauce.usersDisliked.find((user) => user === req.body.userId)) {
            Sauce.updateOne(
              { _id: req.params.id },
              {
                $inc: { dislikes: -1 }, // MongoDB function du increment value
                // User Id must be removed from usersdisliked Array.
                $pull: { usersDisliked: req.body.userId }, // MongoDB function used to remove a userId
              }
            )
              .then(() => {
                res.status(200).json({ message: "Modified!" });
              })
              .catch((error) => {
                res.status(400).json({ error: error });
              });
          }
        })
        .catch((error) => {
          res.status(404).json({ error: error });
        });
      break;

// If like = -1, user dislike this sauce.
    case -1:
      Sauce.updateOne(
        { _id: req.params.id },
        {
          $inc: { dislikes: 1 },// MongoDB function du increment value
          // User Id must be added to usersDisliked Array.
          $push: { usersDisliked: req.body.userId }, // MongoDB function used to add a userId in array
        }
      )
        .then(() => res.status(200).json({ message: "Modified!" }))
        .catch((error) => res.status(400).json({ error }));
      break;
      default : console.log('error');
  }
};
