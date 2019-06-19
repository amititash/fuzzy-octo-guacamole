import examplesRouter from './api/controllers/examples/router';
import usersRouter from './api/controllers/users/router';
import storiesRouter from './api/controllers/stories/router';

export default function routes(app) {
  app.use('/api/v1/examples' , examplesRouter);
  app.use('/api/v1/users', usersRouter);
  app.use('/api/v1/stories', storiesRouter);
}
