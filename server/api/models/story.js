const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StorySchema = new Schema({
    title : { type : String },
    type : {
        type : String,
        enum : ['idea', 'knowledge', 'news', 'info'],
        default : 'idea'
    },
    url : { type : String },
    details : { type : String },
    video : { type : String },
    audio : { type : String },
    image : { type : String },
    owner : { type : String },
    category : { type : String },
    tags : [{type : String}]
});

module.exports = mongoose.model("Story", StorySchema);
