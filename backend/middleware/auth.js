//                                         -------------------------------------------------------
//                                         --         AUTHENTIFICATION MIDDLEWARE               --
//                                         -------------------------------------------------------

// Modules needed
const jwt = require('jsonwebtoken');
require ('dotenv').config();


module.exports = (req, res, next) => {
  try {
    // We need to extract token from request
    const token = req.headers.authorization.split(' ')[1];
    // Use of verify function to decode token with the secret key
    const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
    // let get the user id contain in decoded Token
    const userId = decodedToken.userId;
    // If there is no user id or, if user id is different from id incomming with token
    if (req.body.userId && req.body.userId !== userId) {
      // we send an error
      throw 'Invalid user ID';
    } else {
      // if everything's fine we continue application
      next();
    }
  } catch {
    // If there's an error, we return a status error code
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};