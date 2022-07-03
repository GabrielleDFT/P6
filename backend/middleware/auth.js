//----------------------------------------------------- USER VERIFICATION SAFE ROADS -------------------------------------------------------

//Retrieve jsonwebtoken package
const jwt = require("jsonwebtoken");

require("dotenv").config();

//--Middleware applied to all Routes to secure them--
module.exports = (req, res, next) => {
    try {
      //--Generated Key Recovery - Retrieving Token in authorization request Header, retrieve 2eme element from array (car split)--
      const token = req.headers.authorization.split(" ")[1];
                
      //--Key Decoding - Checking decoded Token with initiated secret key (Cf Controller user)--
      const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
                
      //--ID Recovery in TOKEN - Checking userId sent with request matches to userId encoded in Token--
      const userId = decodedToken.userId;
                
      //--ID retrieval in request--
      req.auth = { userId };
                
     //--IDs Comparison--
      if (req.body.userId && req.body.userId !== userId) {
        throw "Invalid user ID";//--If Token don't match with userId : error--
      } else {
        next();//--If valid, pass to next middleware--
      }
    } catch {
      res.status(401).json({
        error: new Error("Invalid request!"),
      });
    }
};



