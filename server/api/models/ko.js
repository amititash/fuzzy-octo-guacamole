const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const axios = require('axios');


const KoSchema = new Schema({
    ideaName : { type : String },
    ideaDescription : { type : String , required : true},
    ideaCategories : [ {type : String}],
    ideaStage : { type : String , default : "idea_perceived"},
    ideaOwner : { type : String , required : true },
    targetCustomers : [ {type : String }],
    problemsSolved : [ {type : String }],
    newCapabilities : [ {type : String} ],    // mapped to "most innovating aspect of idea"
    competitors : [ {type : String }],        // are there other companies that might be competitors ?
    competitiveDifferentiation : [{type : String }],
    requiredSkills : [ {type : String }],
    requiredTechnology : [{type : String}]
});


KoSchema.pre('save', async function(next){
    let ideaCategories = [];
    try {
        let response = await axios.get(`${process.env.IDEA_CLASSIFIER_API_URL}:3333/predict?idea=${this.ideaDescription}`);
        ideaCategories = response.data["PRED"].slice(0,5);
    }
    catch(e) {
        console.log(e);
        throw e;
    }
    this.ideaCategories = [];
    ideaCategories.forEach( ideaCategory => {
        this.ideaCategories.push(ideaCategory.topic);
    })
    console.log("about to be saved", ideaCategories);
    next();
})

// there are no hooks for updates --> discuss with titash. Right now we are only creating not updating.

module.exports = mongoose.model("Ko", KoSchema);




