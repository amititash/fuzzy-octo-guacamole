import l from '../../common/logger';
import db from './stories.db.service';

class StoriesService {
  

  updateStory(criteria, projection, options) {
    return db.updateOne(criteria,projection, options);
  }

  getStory(criteria, projection, options) {
    return db.findOne(criteria, projection, options);
  }

  getAllStories(criteria, projection, options) {
    return db.findAll(criteria, projection, options);
  }

  deleteStory(criteria, projection, options) {
    return db.deleteOne(criteria, projection, options);
  }

  createStory(objToSave) {
    return db.insertOne(objToSave);
  }
}

export default new StoriesService();
