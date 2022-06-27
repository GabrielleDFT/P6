
//Import Express 
const express = require('express');

//Application creation with "express" method
const app = express();

const sauceRoutes = require("./routes/sauce");
const userRoutes = require("./routes/user");

const path = require("path");

//Express takes all application/json requests & puts their body on req object
app.use(express.json());

//Import Mongoose for connection to MongoDB
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://user_1:hello@cluster0.g4wpmcl.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


//--CORS ERRORS--: Problems solving & API access (Localhosts 3000 and 4200 communicate)
   app.use((req, res, next) => {
res.setHeader('Access-Control-Allow-Origin', '*'); //permet d'accéder à notre API depuis n'importe quelle origine 
res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
next();
});

//-La méthode "app.use" = route générale & la fonction (middleware)
app.use((req,res) => {
  //  res.status(201);
   res.json({message:'Votre requête a bien été reçue !'});
});

//Static management - Images
app.use("/images", express.static(path.join(__dirname,"images")));

//Used Roads
app.use("/api/sauces", sauceRoutes);
app.use("/api/auth", userRoutes);

//Export app.js app to have access from Node Server
module.exports = app;


