import { Router } from 'express';
import ItemController from '../controllers/item.controller';
import { CreateUserDto } from '../dtos/users.dto';
import Route from '../interfaces/routes.interface';
import validationMiddleware from '../middlewares/validation.middleware';

class ItemsRoute implements Route {
  public path = '/item';
  public router = Router();
  public itemController = new ItemController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
     this.router.get(`${this.path}/update`, this.itemController.updateItemPrices);
     this.router.get(`${this.path}/list`, this.itemController.getItemList);
     this.router.post(`${this.path}`, this.itemController.addItemToZombie);
     this.router.delete(`${this.path}`, this.itemController.removItemByIdFromZombie);
  }
}

export default ItemsRoute;
