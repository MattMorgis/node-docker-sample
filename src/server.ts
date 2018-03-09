import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as handlebars from 'express-hbs';
import * as logger from 'morgan';
import * as path from 'path';
import * as favicon from 'serve-favicon';

import {AppRouter} from './routes/AppRouter';

class Server {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.middleware();
    this.productionSetup();
    this.routes();
    this.viewEngine();
    this.noRouteErrorHandling();
    this.genericErrorHandling();
  }

  private isProd(): boolean {
    return this.express.get('env') === 'production';
  }

  private middleware(): void {
    // uncomment after placing your favicon in /public
    // this.express.use(favicon(path.join(__dirname, '../public', 'favicon.ico')));
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({extended: false}));
    this.express.use(cookieParser());
    this.express.disable('x-powered-by');
    this.express.use(express.static(path.join(__dirname, '../public')));
  }

  private productionSetup(): void {
    this.isProd()
      ? this.express.use(logger('combined'))
      : this.express.use(logger('dev'));
    this.express.set('trust proxy', this.isProd());
  }

  private routes(): void {
    this.express.use('/', new AppRouter().router);
  }

  private viewEngine(): void {
    this.express.engine('hbs', handlebars.express4());
    this.express.set('view engine', 'hbs');
    this.express.set('views', [path.join(__dirname, '..', 'views')]);
    handlebars.registerHelper('isProd', function(options) {
      if (process.env.APP_ENV === 'production') {
        return options.fn(this);
      }

      return null;
    });
  }

  private noRouteErrorHandling(): void {
    // catch 404 and forward to error handler
    this.express.use((request, response, next) => {
      const error: {status?: number; message: string} = new Error('Not Found');
      error.status = 404;
      next(error);
    });
  }

  private genericErrorHandling(): void {
    this.express.use((error, request, response, next) => {
      response.locals.message = error.message;
      response.locals.error =
        process.env.NODE_ENV === 'development'
          ? error
          : new Error('Operation failed.');

      // send error
      response
        .status(error.status || 500)
        .send({error: response.locals.error.message});
    });
  }
}

export {Server};
