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
    requiredTechnology : [{type : String}],
    freshness : {type : Number },
    newCategories : [{type : String}],
    userCategories : [{type : String}],
    startupSkills : [{type : String}],
    startupSize : [{type : String}],
    fundability : {type : Number }
});


KoSchema.pre('save', async function(next){
    let ideaCategories = [];
    let freshness = [];
    let fundability = [];
    let startupSize = [];
    let startupSkills = [];
    let userCategories = [];
    let newCategories = [];



    let promises = [];

    let fetchIdeaCategories = axios.get(`${process.env.IDEA_CLASSIFIER_API_URL}/categories?idea=${this.ideaDescription}`);
    let fetchFreshness = axios.get(`${process.env.IDEA_CLASSIFIER_API_URL}/freshness?idea=${this.ideaDescription}`);
    let fetchStartupSkills = axios.get(`${process.env.IDEA_CLASSIFIER_API_URL}/startup-skills?idea=${this.ideaDescription}`);
    let fetchStartupSize = axios.get(`${process.env.IDEA_CLASSIFIER_API_URL}/size?idea=${this.ideaDescription}`);
    let fetchFundability = axios.get(`${process.env.IDEA_CLASSIFIER_API_URL}/fundability?idea=${this.ideaDescription}`);
    let fetchUserCategories = axios.get(`${process.env.IDEA_CLASSIFIER_API_URL}/user-categories?idea=${this.ideaDescription}`);
    let fetchNewCategories = axios.get(`${process.env.IDEA_CLASSIFIER_API_URL}/new-categories?idea=${this.ideaDescription}`);

    promises.push(fetchIdeaCategories);
    promises.push(fetchFreshness);
    promises.push(fetchStartupSkills);
    promises.push(fetchStartupSize);
    promises.push(fetchFundability);
    promises.push(fetchUserCategories);
    promises.push(fetchNewCategories);


    try {
        let results = await Promise.all(promises);
        ideaCategories = results[0].data["PRED"].slice(0,5);
        freshness = results[1].data["PRED"].slice(0,5);
        startupSkills = results[2].data["PRED"].slice(0,5);
        startupSize = results[3].data["PRED"].slice(0,5);
        fundability = results[4].data["PRED"].slice(0,5);
        userCategories = results[5].data["PRED"].slice(0,5);
        newCategories = results[6].data["PRED"].slice(0,5);
    }
    catch(error) {
        console.log("Error in idea predictor api", error);
        throw error;
    }




    this.ideaCategories = [];
    console.log(ideaCategories)
    ideaCategories.forEach( ideaCategory => {
        this.ideaCategories.push(ideaCategory.topic);
    })
    console.log("about to be saved", ideaCategories);


    this.freshness = freshness[0].pred;

    this.fundability = fundability[0].pred;

    this.startupSize = [];
    startupSize.forEach( val => {
        this.startupSize.push(val.topic);
    })

    this.startupSkills = [];
    startupSkills.forEach( val => {
        this.startupSkills.push(val.topic);
    })

    this.userCategories = [];
    userCategories.forEach( ideaCategory => {
        this.userCategories.push(ideaCategory.topic);
    })

    this.newCategories = [];
    newCategories.forEach( val => {
        this.newCategories.push(val.topic);
    })

    next();
})

// there are no hooks for updates --> discuss with titash. Right now we are only creating not updating.

module.exports = mongoose.model("Ko", KoSchema);




