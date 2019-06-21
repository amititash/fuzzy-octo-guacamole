import * as express from 'express';
import controller from './controller';

export default express
  .Router()
  .post('/createKo', controller.createKo)
  .get('/', controller.getKo)
  .get('/allkos', controller.getAllKos)
  .delete('/', controller.deleteKo)
  .patch('/', controller.updateKo)
