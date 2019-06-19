import l from '../../common/logger';
import db from './kos.db.service';

class KosService {
  

  updateKo(criteria, projection, options) {
    return db.updateOne(criteria,projection, options);
  }

  getKo(criteria, projection, options) {
    return db.findOne(criteria, projection, options);
  }

  getAllKos(criteria, projection, options) {
    return db.findAll(criteria, projection, options);
  }

  deleteKo(criteria, projection, options) {
    return db.deleteOne(criteria, projection, options);
  }

  createKo(objToSave) {
    return db.insertOne(objToSave);
  }
}

export default new KosService();
