import * as express from 'express';
import controller from './controller';

export default express
  .Router()
  .post('/', controller.createKo)
  // .get('/', controller.getKo)
  .get('/', controller.getAllKos)
  .delete('/', controller.deleteKo)
  .patch('/', controller.updateKo)
