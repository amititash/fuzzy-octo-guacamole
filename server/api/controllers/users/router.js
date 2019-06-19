import * as express from 'express';
import controller from './controller';

export default express
  .Router()
  .post('/', controller.createUser)
  .get('/', controller.getUser)
  .delete('/', controller.deleteUser)
  .patch('/', controller.updateUser);
