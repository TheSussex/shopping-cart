import helmet from 'helmet';
import { json, urlencoded } from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import router from '../router';
import loggerInit from '../logger';
import { errorHandler } from '../../lib/http/lib.http.errorhandler';
import ApiResponse from '../../lib/http/lib.http.response';
import enums from '../../lib/enums';

const { MSG_ROUTE_DOES_NOT_EXIST, HTTP_NOT_FOUND } = enums;

const expressConfig = app => {
  let logger;

  switch (app.get('env')) {
  case 'development':
    logger = loggerInit('development');
    break;

  case 'production':
    logger = loggerInit('production');
    break;

  case 'staging':
    logger = loggerInit('staging');
    break;

  case 'test':
    logger = loggerInit('test');
    break;

  default:
    logger = loggerInit();
  }

  global.logger = logger;
  logger.info('Application starting...');
  app.use(
    urlencoded({
      extended: true,
    }),
  );

  app.use(json());
  app.use(cors());
  app.use(helmet());
  app.use(compression());
  app.use(fileUpload());

  router(app);

  app.get('/', (req, res) => {
    res.send({ message: 'Welcome' });
  });

  // catch 404 and forward to error handler
  // No routes matched? 404.
  app.use((req, res /* next */) => ApiResponse.error(res, MSG_ROUTE_DOES_NOT_EXIST, HTTP_NOT_FOUND));
  // Handle all errors in the application
  app.use(errorHandler);
};

export default expressConfig;
