import * as express from 'express';
import controller from './controller';

export default express
  .Router()
  .post('/', controller.createOrUpdateKo)
  .get('/ko', controller.getKo)
  .get('/', controller.getAllKos)
  .delete('/', controller.deleteKo)
  .delete('/all', controller.deleteAllKos)
  .patch('/', controller.updateKo)
  .get('/sorted', controller.sortedKo)
  .get('/numbered', controller.getNumberedKos)
  .get('/count', controller.getKoCount)
  .get('/numberOfSubmittedIdeas', controller.getSubmittedIdeasCount)
  .get('/allSubmittedIdeas', controller.getAllSubmittedIdeas)
  .get('/report', controller.getKoReport)
