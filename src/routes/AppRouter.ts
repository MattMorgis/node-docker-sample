import {NextFunction, Request, Response, Router} from 'express';

class AppRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.home();
  }

  private home() {
    /* GET home page. */
    this.router.get(
      '/',
      (request: Request, response: Response, next: NextFunction) => {
        response.render('index', {pid: process.pid, uptime: process.uptime});
      }
    );
  }
}

export {AppRouter};
