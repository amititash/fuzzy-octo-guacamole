const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const KoSchema = new Schema({
    title : { type : String, required : true },
    type : {
        type : String,
        enum : ['idea', 'knowledge', 'news', 'info'],
        required : true
    },
    url : { type : String },
    details : { type : String, required : true },
    video : { type : String },
    audio : { type : String },
    image : { type : String },
    owner : { type : String ,required : true},
    category : { type : String },
    tags : [{type : String}]
});

module.exports = mongoose.model("Ko", KoSchema);
