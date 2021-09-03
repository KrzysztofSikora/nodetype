import { Table, Column, Model, HasMany, Scopes, BelongsToMany } from 'sequelize-typescript'
import itemModel from './item.model';
import zombieItemModel from './zombie-item';

@Scopes(() => ({
    user: {
      include: [
        {
          model: zombieModel,
          through: {attributes: []},
        },
      ],
    },
  }))

@Table({tableName: 'zombies'})
export class zombieModel extends Model {
  @Column
  name: string
  
  @BelongsToMany(() => itemModel, () => zombieItemModel)
  item: itemModel[]
}

export default zombieModel;
