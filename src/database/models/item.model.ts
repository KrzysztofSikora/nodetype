import {
  Table,
  Column,
  Model,
  HasMany,
  Scopes,
  BelongsTo,
  ForeignKey,
  BelongsToMany,
} from "sequelize-typescript";
import zombieItemModel from "./zombie-item";
import zombieModel from "./zombie.model";

@Scopes(() => ({
  role: {
    include: [
      {
        model: itemModel,
        through: { attributes: [] },
      },
    ],
  },
}))
@Table({ tableName: "item" })
export class itemModel extends Model {
  @Column
  name: string;

  @Column
  price: number;

  @BelongsToMany(() => zombieModel, () => zombieItemModel)
  zombies: zombieModel[];
}

export default itemModel;
