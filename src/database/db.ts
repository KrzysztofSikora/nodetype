import { Sequelize } from 'sequelize-typescript'

export const sequelize = new Sequelize({
  database: 'test',
  dialect: 'mysql',
  username: 'root',
  password: 'password',
  storage: ':memory:',
  models: [__dirname + '/models'] // or [Player, Team],
})

console.log("tstststst",__dirname + '/models')