import { Router } from 'express';
import IndexController from '../controllers/index.controller';
import Route from '../interfaces/routes.interface';

class IndexRoute implements Route {
  public path = '/';
  public router = Router();
  public indexController = new IndexController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {

    this.router.get(`${this.path}`, this.indexController.index);
    this.router.get(`/left`, this.indexController.left);
    this.router.get(`/right`, this.indexController.right);
    this.router.get(`/up`, this.indexController.up);
    this.router.get(`/down`, this.indexController.down);
    this.router.get(`/stop`, this.indexController.stop);
    this.router.get(`/allForward`, this.indexController.allForward);
    this.router.get(`/allStop`, this.indexController.allStop);
    this.router.get(`/allBackward`, this.indexController.allBackward);
    this.router.get(`/turnRight`, this.indexController.turnRight);
    this.router.get(`/turnLeft`, this.indexController.turnLeft);
    this.router.get(`/systemOff`, this.indexController.systemOff);
    this.router.get(`/power`, this.indexController.power);
  }
}

export default IndexRoute;
