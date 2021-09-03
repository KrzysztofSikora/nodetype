import * as bcrypt from 'bcrypt';
import { CreateZombieDto } from '../dtos/zombie.dto';
import HttpException from '../exceptions/HttpException';
import { Zombie } from '../interfaces/zombie.interface';
import zombieModel from '../database/models/zombie.model';
import rateService from './rates.service'
import { isEmptyObject } from '../utils/util';
import { create } from 'domain';
import ZombieRoute from 'routes/zombies.route';
import { raw } from 'express';

class ZombieService {
  public zombie = zombieModel;
  public rateService = new rateService();

  public async addZombie(zombieData: CreateZombieDto): Promise<Zombie> {
    if (isEmptyObject(zombieData)) {
      throw new HttpException(400, "is-not-zombie-data");
    }
    const createdZombie: Zombie = await this.zombie.create(zombieData);    
    return createdZombie;
  }
  public async findAllZombies(): Promise<Zombie[]> {
    const allZombies: zombieModel[] = await this.zombie.findAll({raw: true});
    return allZombies;
  }
  
  public async findZombieById(zombieId: number): Promise<Zombie> {
    const findZombie: any = this.zombie.findOne({
      where: {
        id: zombieId,
      },
    });
    if (!findZombie) {
      throw new HttpException(409, "is-not-zombie");
    }

    return findZombie;
  }

  public async deleteZombie(zombieId: number): Promise<number> {
    const status = await this.zombie.destroy({
      where: {
        id: zombieId
      }
    });

    if (!status) {
      throw new HttpException(409, "zombie-is-not-inside-db");
    }

    return status;
  }

  public async updateZombie(zombieId: number, zombieData: Zombie): Promise<number> {
    if (isEmptyObject(zombieData)) {
      throw new HttpException(400, "is-not-zombie");
    } 
    const status = await this.zombie.update(zombieData, {
      where: {
        id: zombieId
      }
    });

    if(!status[0]) {
      throw new HttpException(409, "zombie-is-not-inside-db-or-propertis");
    }
    return status[0];
  }

  public async calculateZombiePriceByRate(zombieId: number): Promise<number> {
   
    const zombie = await this.zombie.findOne({
      where: {
        id: zombieId
      }
    });

    const result = await this.rateService.getAllRates();
    return 1;
  }
}

export default ZombieService;
