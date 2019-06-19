import * as express from 'express';
import controller from './controller';

export default express
  .Router()
  .post('/', controller.createStory)
  .get('/', controller.getStory)
  .delete('/', controller.deleteStory)
  .patch('/', controller.updateStory)
