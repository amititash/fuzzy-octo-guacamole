const Kos = require('../models/ko');




class KosDatabase {
    constructor() {

    }

    updateOne(criteria, projection, options) {
      return Kos.findOneAndUpdate(criteria, projection, options);
    }  
  
    findOne(criteria, projection, options) {
      return Kos.findOne(criteria, projection, options);
    }

    findAll(criteria, projection, options) {
      return Kos.find(criteria,projection, options);
    }

    deleteOne(criteria, projection, options) {
      return Kos.findOneAndDelete(criteria, projection, options);
    }
  
    insertOne(objToSave) {
        let newKo = new Kos(objToSave);
        return newKo.save();
    }
  }
  
  export default new KosDatabase();
  