                //---- USER MODEL ----
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

//--Database model to Signup (Register a New User)--
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

//--Verification for Single Email Address--
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("user", userSchema);
