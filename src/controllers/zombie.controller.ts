import zombieItemModel from 'database/models/zombie-item';
import { NextFunction, Request, Response } from 'express';
import { Zombie } from 'interfaces/zombie.interface';
import zombieItemService from '../services/zombie-item.service';
import zombieService from '../services/zombie.service';

class ZombiesController {
  public zombieService = new zombieService();
  public zombieItemService = new zombieItemService();

  /**
   * Get all zombies
   * @param req 
   * @param res 
   * @param next 
   */
  public getZombies = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllZombies: Zombie[] = await this.zombieService.findAllZombies();
      res.status(200).json({ data: findAllZombies, message: 'list-zombies' });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Add zombie to the list.
   * @param req 
   * @param res 
   * @param next 
   */
  public addZombie = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const zombie: Zombie = await this.zombieService.addZombie(req.body);
      res.status(200).json({ data: zombie, message: 'new-zombie-added' });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Remove zombie from list.
   * @param req 
   * @param res 
   * @param next 
   */
  public removeZombie = async (req: Request, res: Response, next: NextFunction) => {
    const zombieId: number = Number(req.params.id);
    try {
      await this.zombieService.deleteZombie(zombieId);
      res.status(200).json({ data: { 'id': req.params.id}, message: 'zombie-has-been-deleted' });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update zombie by zombie's id.
   * @param req 
   * @param res 
   * @param next 
   */
  public updateZombieById = async (req: Request, res: Response, next: NextFunction) => {
    const zombieId: number = Number(req.params.id);
    try {
      await this.zombieService.updateZombie(zombieId, req.body);
      res.status(200).json({ data: { 'id': req.params.id, ...req.body }, message: 'zombie-updated' });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Display selected zombie (name and creation date)
   * @param req 
   * @param res 
   * @param next 
   */
  public getZombieById = async (req: Request, res: Response, next: NextFunction) => {
    const zombieId: number = Number(req.params.id);
    try {
      const findOneUserData: Zombie = await this.zombieService.findZombieById(zombieId);
      res.status(200).json({ data: findOneUserData, message: 'find-one-zombie' });
    } catch (error) {
      next(error);
    }
  }
  
  /**
   * Display items that this zombie has (by zombie id)
   * @param req 
   * @param res 
   * @param next 
   */
  public getItemsByZombieId = async (req: Request, res: Response, next: NextFunction) => {
    const zombieId: number = Number(req.params.id);

    try {
      const zombieItem: zombieItemModel = await this.zombieItemService.getItemOfZombie(zombieId);
      res.status(200).json({ data: zombieItem, message: 'items-of-zombie' });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Display items that this zombie has (by zombie id)
   * @param req 
   * @param res 
   * @param next 
   */
   public getTotalValueAllItemsOfZombie = async (req: Request, res: Response, next: NextFunction) => {
    const zombieId: number = Number(req.params.id);

    try {
      const zombieItem: zombieItemModel = await this.zombieItemService.getTotalValueAllItemsOfZombie(zombieId);
      res.status(200).json({ data: zombieItem, message: 'zombie-items-total-value' });
    } catch (error) {
      next(error);
    }
  }

  
}

export default ZombiesController;
