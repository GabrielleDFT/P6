//--Import Express--
const express = require("express");

//--Import Mongoose to use Database--
const mongoose = require("mongoose");

//--Application creation with "express" method--
const app = express();

//Routes declaration - Import the route dedicated to Sauces
const sauceRoutes = require("./routes/sauce");
const userRoutes = require("./routes/user");

//--Give access to path of file system--
const path = require("path");

//--Express takes all application/json requests & puts their body on req object--
app.use(express.json());

//--Import Mongoose for connection to MongoDB--
mongoose.connect(process.env.MONGO_DB_URL, { 
    useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

//---------------CORS ERRORS : Problems solving & API access (Localhosts 3000 and 4200 communicate)--------------------------
app.use((req, res, next) => {
  //--Allows access to our API from any origin--
  res.setHeader("Access-Control-Allow-Origin", "*"); 
   //--Headers used after Cross-origin verification to authorize--
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
  //--Allowed methods for HTTP requests--
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  next();
});

//--Static management Images (Allow to load files in image directory)--
app.use("/images", express.static(path.join(__dirname, "images")));

//--Routes used to manage all ressources from API (Send requests to urls to the corresponding routes)--
app.use("/api/sauces", sauceRoutes);
app.use("/api/auth", userRoutes);

//--Export app.js app to have access from Node Server--
module.exports = app;
