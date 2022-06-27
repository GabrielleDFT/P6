            //---- LOGIC APPLIED TO USER ROADS ----
const user = require("../models/user");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

//--USER REGISTRATION--
exports.signup = (req, res, next) => {
  //--Hash Password before send it to Database--
  bcrypt
      //salt = 10 / Number of times the hashing algorithm will be executed
    .hash(req.body.password, 10)
    .then((hash) => {
      //--Saved in MongoDB--
      const user = new User({
        email: req.body.email,
        password: hash
      });
      //--User sent in MongoDB Database--
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }).send());
};

//--USER LOGIN--
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          //--Invalid Password--
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect" });
          }
          //--Valid Password--
          res.status(200).json({
            //Encodage du userId pour la création de nouveau objet(objet et userId seront liés)
            userId: user._id,
            token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", 
            {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};