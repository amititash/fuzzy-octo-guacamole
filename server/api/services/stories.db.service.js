const Stories = require('../models/story');




class StoriesDatabase {
    constructor() {

    }

    updateOne(criteria, projection, options) {
      return Stories.findOneAndUpdate(criteria, projection, options);
    }  
  
    findOne(criteria, projection, options) {
      return Stories.findOne(criteria, projection, options);
    }

    findAll(criteria, projection, options) {
      return Stories.find(criteria,projection, options);
    }

    deleteOne(criteria, projection, options) {
      return Stories.findOneAndDelete(criteria, projection, options);
    }
  
    insertOne(objToSave) {
        let newStory = new Stories(objToSave);
        return newStory.save();
    }
  }
  
  export default new StoriesDatabase();
  