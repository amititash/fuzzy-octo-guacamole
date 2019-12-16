import * as express from 'express';
import controller from './controller';

export default express
  .Router()
  .post('/', controller.createUser)
  .get('/', controller.getUser)
  .delete('/', controller.deleteUser)
  .patch('/', controller.updateUserByEmail)
  .get('/byEmail', controller.getUserByEmail)
  .get('/all', controller.getAllUsers)
  .post('/founderquiz/creativityScore', controller.storeCreativityScore)
  .post('/setBotFlowMode', controller.setBotFlowMode)
  .get('/getBotFlowMode', controller.getBotFlowMode)
