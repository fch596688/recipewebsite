var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

// define user data model
var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);