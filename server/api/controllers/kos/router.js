import * as express from 'express';
import controller from './controller';

export default express
  .Router()
  .post('/', controller.createKo)
  .get('/', controller.getKo)
  .delete('/', controller.deleteKo)
  .patch('/', controller.updateKo)
