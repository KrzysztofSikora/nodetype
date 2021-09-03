import zombieItemModel from 'database/models/zombie-item';
import { NextFunction, Request, Response } from 'express';
import zombieItemService from '../services/zombie-item.service';
import itemsService from '../services/items.service';
import zombieService from '../services/zombie.service';
import currencyService from '../services/rates.service'

class ItemController {
  public zombieService = new zombieService();
  public itemsService = new itemsService();
  public zombieItemService = new zombieItemService();
  public currencyService = new currencyService();
  
  /**
   * Add item to zombie's item list. Max 5 items.
   * @param req 
   * @param res 
   * @param next 
   */
  public updateItemPrices = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.itemsService.itemListCurrencyUpdate();
      res.status(200).json({ data: result, message: 'rates-updated' });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Add item to zombie's item list. Max 5 items.
   * @param req 
   * @param res 
   * @param next 
   */
   public getItemList = async (req: Request, res: Response, next: NextFunction) => {
    const items = await this.itemsService.getAllItem();
    try {
      res.status(200).json({ data: items, message: 'inset intem' });
    } catch (error) {
      next(error);
    }
  }

   /**
   * Add item to zombie's item list. Max 5 items.
   * @param req 
   * @param res 
   * @param next 
   */
    public addItemToZombie = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const result = await this.zombieItemService.insertZombieItem(req.body)
        res.status(200).json({ data: result, message: 'add-item-to-zombie' });
      } catch (error) {
        next(error);
      }
    }

  /**
   * Remove item by item if from zombie list by zombie's id.
   * @param req 
   * @param res 
   * @param next 
   */
  public removItemByIdFromZombie = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.zombieItemService.removeZombieItem(req.body.zombieId, req.body.itemId);
      res.status(200).json({ data: result, message: 'item-zombie-deleted' });
    } catch (error) {
      next(error);
    }
  }
}

export default ItemController;
