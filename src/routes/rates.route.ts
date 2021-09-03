import { Router } from 'express';
import RateController from '../controllers/rate.controller';
import Route from '../interfaces/routes.interface';

class RatesRoute implements Route {
  public path = '/rates';
  public router = Router();
  public rateController = new RateController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/update`, this.rateController.updateRates);
    this.router.get(`${this.path}`, this.rateController.getCurrencyRates);
  }
}

export default RatesRoute;
