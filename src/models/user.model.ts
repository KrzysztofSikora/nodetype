import { User } from '../interfaces/user.interface';
import { Table, Column, HasMany, Scopes, Model } from 'sequelize-typescript'
import { DataTypes, Sequelize } from 'sequelize/types';



@Table
class userModel extends Model {
  @Column
  name: string

  @Column
  username: string

  @Column
  email: string

  @Column
  password: string


}

// // password: q1w2e3r4
// const userModel: User[] = [
//     { id: 1, name: 'lim@gmail.com', username: 'lim@gmail.com', email: 'lim@gmail.com', password: '$2b$10$hmrwtGwC.QlfWt6YWaT3S.FP9CarS3.V9n3Qr.d9y2ovcan0oxs56' },
// ];

// export default userModel;
