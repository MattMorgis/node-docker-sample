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
        response.render('index', {
          pid: process.pid,
          uptime: this.format(process.uptime()),
        });
      }
    );
  }

  private format(uptime): string {
    const pad = s => (s < 10 ? '0' : '') + s;
    const hours = Math.floor(uptime / (60 * 60));
    const minutes = Math.floor((uptime % (60 * 60)) / 60);
    const seconds = Math.floor(uptime % 60);

    return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
  }
}

export {AppRouter};
