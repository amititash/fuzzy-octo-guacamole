import l from '../../common/logger';
import db from './users.db.service';

class UsersService {
  

  updateUser(criteria, projection, options) {
    return db.updateOne(criteria,projection, options);
  }

  getUser(criteria, projection, options) {
    return db.findOne(criteria, projection, options);
  }

  getAllUsers(criteria, projection, options) {
    return db.findMany(criteria, projection, options);
  }

  deleteUser(criteria, projection, options) {
    return db.deleteOne(criteria, projection, options);
  }

  createUser(objToSave) {
    return db.insertOne(objToSave);
  }
}

export default new UsersService();
