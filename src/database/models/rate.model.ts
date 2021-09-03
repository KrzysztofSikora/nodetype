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
import   { DataTypes, FloatDataType } from "sequelize/types";
import zombieItemModel from "./zombie-item";
import zombieModel from "./zombie.model";
import {DataType} from 'sequelize-typescript';

@Scopes(() => ({
  role: {
    include: [
      {
        model: rateModel,
        through: { attributes: [] },
      },
    ],
  },
}))
@Table({ tableName: "rate" })
export class rateModel extends Model {
  @Column
  currency: string;

  @Column
  code: string;

  @Column({type: DataType.FLOAT})
  bid: number

  @Column({type: DataType.FLOAT})  
  ask: number
}

export default rateModel;
