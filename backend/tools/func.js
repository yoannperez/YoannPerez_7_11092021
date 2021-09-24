const jwt = require("jsonwebtoken");

module.exports = {
  
  whatId: function (req) {
    // -------- Find userid contained in the token -------------------
    const token = req.headers.authorization.split(" ")[1];
    // Use of verify function to decode token with the secret key
    const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
    // let get the user id contain in decoded Token
    // const userId = decodedToken.userId;
    
    return decodedToken.userId;
  },
};
