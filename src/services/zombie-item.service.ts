import itemModel from "../database/models/item.model";
import { isEmptyObject } from "../utils/util";
import axios from "axios";
import zombieItemModel from "../database/models/zombie-item";
import HttpException from "../exceptions/HttpException";
import { Op, fn, col, literal } from "sequelize";
import zombieModel from "../database/models/zombie.model";
import rateModel from "../database/models/rate.model";
import { type } from "os";
import { cursorTo } from "readline";

class ZombieItemService {
  public item = itemModel;
  public zombie = zombieModel;
  public rates = rateModel;

  public zombieItem = zombieItemModel;

  public async insertZombieItem(zombieItem: any): Promise<any> {
    const allZombieItems = await this.zombieItem.findAll({
      where: zombieItem.Id,
    });
    if (allZombieItems.length < 5) {
      try {
        const result = await this.zombieItem.create(zombieItem);
        return result;
      } catch (error) {
        throw new HttpException(409, "zombie-has-the-item");
      }
    } else {
      throw new HttpException(409, "zombie-has-five-items");
    }
  }

  public async removeZombieItem(
    zombieId: number,
    itemId: number
  ): Promise<any> {
    try {
      const result = await this.zombieItem.destroy({
        where: {
          [Op.and]: [{ zombieId: zombieId }, { itemId: itemId }],
        },
      });
      return result;
    } catch (error) {
      throw new HttpException(409, "incorrect-zombie-or-item-id");
    }
  }

  public async getItemOfZombie(zombieId: number): Promise<any> {
    try {
      const result = await this.zombieItem.findAll({
        where: {
          zombieId: zombieId,
        },
      });
      return result;
    } catch (error) {
      throw new HttpException(409, "item-of-zombie-not-found");
    }
  }

  public async getTotalValueAllItemsOfZombie(zombieId: number): Promise<any> {
    try {
      const result = await this.zombie.findAll({
        raw: true,
        include: "item",
        where: {
          id: zombieId,
        },
       attributes: ['item.price']
      });

      //@todo check
      const sumOfBasicValue = result.reduce((prevItem, nextItem) => {
        return (prevItem['price']) * (nextItem['price'])
      })
     
     
      const rates = await this.rates.findAll({
        limit: 2,
        raw: true,
        where: {
          [Op.or]: [{ code: "PLN" }, { code: "EUR" }, { code: "USD" }],
        },
        order: [["createdAt", "DESC"]],
      });

      return rates.map((rate) => {
        return {
          code: rate.code,
          value: (sumOfBasicValue as unknown as number) * rate.ask,
        };
      });
    } catch (error) {
      throw new HttpException(409, "total-value-item-of-zombie-not-found");
    }
  }
}

export default ZombieItemService;
