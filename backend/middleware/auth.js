            //---- USER VERIFICATION SAFE ROADS ----
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
      //--Generated Key Recovery--
      const token = req.headers.authorization.split(" ")[1];

      //--Key Decoding--
      const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");

      //--ID Recovery in TOKEN--
      const userId = decodedToken.userId;

      //--ID retrieval in request--
      req.auth = { userId };

     //--IDs Comparison--
      if (req.body.userId && req.body.userId !== userId) {
        throw "Invalid user ID";
      } else {
        next();
      }
    } catch {
      res.status(401).json({
        error: new Error("Invalid request!"),
      });
    }
};