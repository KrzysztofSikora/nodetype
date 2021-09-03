import itemModel from '../database/models/item.model';
import { isEmptyObject } from '../utils/util';
import axios from 'axios';

class ItemsService {
  public item = itemModel;

  api = axios.create({
    baseURL: `https://zombie-items-api.herokuapp.com/`
  })

  /**
   * Method returns all of items with current prices.
   * @returns 
   */
  getAllItemFromApi = async () => {
      try {
          return await this.api.get(`/api/items`).then(({ data }) => data);
      } catch (e) {
          // @todo message service
          console.log('error', e);
      }
  };


  public async itemListCurrencyUpdate(): Promise<itemModel[]> {
    const items = await this.getAllItemFromApi();
    const result = await this.item.bulkCreate(items.items, { updateOnDuplicate: ["price"] })
    return result;
  }

  public async getAllItem(): Promise<itemModel> {
    const result: any = await this.item.findAll()
    return result;
  }

}

export default ItemsService;
