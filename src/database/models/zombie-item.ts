import { Table, Column, Model, HasMany, Scopes, BelongsTo, ForeignKey } from 'sequelize-typescript'
import itemModel from './item.model';
import zombieModel from './zombie.model'

@Scopes(() => ({
    role: {
      include: [
        {
          model: zombieItemModel,
          through: {attributes: []},
        },
      ],
    },
  }))

@Table({tableName: 'zombieItem'})
export class zombieItemModel extends Model {
  @ForeignKey(() => zombieModel)
  @Column
  zombieId: number

  @ForeignKey(() => itemModel)
  @Column
  itemId: number
}

export default zombieItemModel;
