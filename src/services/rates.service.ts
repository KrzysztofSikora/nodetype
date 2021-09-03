import rateModel from '../database/models/rate.model';
import { isEmptyObject } from '../utils/util';
import axios from 'axios';

class RatesService {
  public rate = rateModel;

  api = axios.create({
    baseURL: `https://api.nbp.pl/api/exchangerates/tables/C/today/?format=json`
  })

  /**
   * Method returns all of items with current prices.
   * @returns 
   */
  getAllRatesFromNBPApi = async () => {
      try {
          return await this.api.get(`?format=json`).then(({ data }) => data);
      } catch (e) {
          // @todo message service
          console.log('error', e);
      }
  };


  public async updateRates(): Promise<rateModel> {
    const items = await this.getAllRatesFromNBPApi();
    console.log('items', items[0].rates)
    const result = await this.rate.bulkCreate(items[0].rates, { updateOnDuplicate: ['ask'] })
    return items;
  }

  public async getAllRates(): Promise<rateModel> {
    const result: any = await this.rate.findAll()
    return result;
  }

}

export default RatesService;
