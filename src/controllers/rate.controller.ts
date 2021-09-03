import { NextFunction, Request, Response } from 'express';
import zombieItemService from '../services/zombie-item.service';
import itemsService from '../services/items.service';
import zombieService from '../services/zombie.service';
import ratesService from '../services/rates.service'

class RateController {
  public zombieService = new zombieService();
  public itemsService = new itemsService();
  public zombieItemService = new zombieItemService();
  public ratesService = new ratesService();
  
  
  /**
   * Add item to zombie's item list. Max 5 items.
   * @param req 
   * @param res 
   * @param next 
   */
  public updatePricesOfItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.itemsService.itemListCurrencyUpdate();
      res.status(200).json({ data: result, message: 'prices-of-item-updated' });
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
   public getPricesOfItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.itemsService.itemListCurrenyUpdate();
      res.status(200).json({ data: result, message: 'prices-of-item-updated' });
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
   public updateRates = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.ratesService.updateRates();
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
   public getCurrencyRates = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.ratesService.getAllRates();
      res.status(200).json({ data: result, message: 'get-saved-rates' });
    } catch (error) {
      next(error);
    }
  }
}

export default RateController;
