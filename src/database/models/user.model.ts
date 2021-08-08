import { Table, Column, Model, HasMany, Scopes } from 'sequelize-typescript'

@Scopes(() => ({
    user: {
      include: [
        {
          model: userModel,
          through: {attributes: []},
        },
      ],
    },
  }))

@Table
export class userModel extends Model {
  @Column
  name: string

  @Column
  username: string

  @Column
  email: string

  @Column
  password: string
}

export default userModel;
