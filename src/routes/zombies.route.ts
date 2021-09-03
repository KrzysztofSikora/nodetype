import { Router } from 'express';
import ZombiesController from '../controllers/zombie.controller';
import { CreateUserDto } from '../dtos/users.dto';
import Route from '../interfaces/routes.interface';
import validationMiddleware from '../middlewares/validation.middleware';

class ZombieRoute implements Route {
  public path = '/zombie';
  public router = Router();
  public zombiesController = new ZombiesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    console.log('init route')
    this.router.get(`${this.path}/list`, this.zombiesController.getZombies);
    this.router.get(`${this.path}/:id(\\d+)`, this.zombiesController.getZombieById);
    this.router.get(`${this.path}/total/:id(\\d+)`, this.zombiesController.getTotalValueAllItemsOfZombie);


    this.router.post(`${this.path}`, this.zombiesController.addZombie);
    this.router.delete(`${this.path}/:id(\\d+)`, this.zombiesController.removeZombie);
    this.router.put(`${this.path}/:id(\\d+)`, this.zombiesController.updateZombieById);



    this.router.get(`${this.path}/items/:id(\\d+)`, this.zombiesController.getItemsByZombieId);
    
  }
}

export default ZombieRoute;
