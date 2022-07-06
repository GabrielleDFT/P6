//----------------------------- USER MODEL --------------------------------

//--Creating User Model with Mongoose - Import Mongoose--
const mongoose = require("mongoose");

//--mongoose-unique-validator passed as plugin = 2 Users cannot share the same Email address--
const uniqueValidator = require("mongoose-unique-validator");

//--Database model to Signup (Register a New User)--
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

//--Verification for Single Email Address--
userSchema.plugin(uniqueValidator);

//--Export model schéma : the model called User & pass the data schema
module.exports = mongoose.model("user", userSchema);
