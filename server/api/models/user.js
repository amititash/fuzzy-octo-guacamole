const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName : { type : String },
    lastName : { type : String },
    timeZone : { type : String },
    locale : { type : String },
    gender : { type : String },
    profilePic : { type : String },
    username : { type : String },
    password : { type : String },
    pointsEarned : { type : Number },
    badge : { type : String },
    email : { type : String },
    bio : { type : String },
    website : { type : String }
});

module.exports = mongoose.model("User", UserSchema);
