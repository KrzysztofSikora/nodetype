import 'dotenv/config';
import App from './app';
import IndexRoute from './routes/index.route';
import validateEnv from './utils/validateEnv';
import ZombieRoute from './routes/zombies.route';
import ItemsRoute from './routes/items.route';
import RatesRoute from './routes/rates.route';

validateEnv();

const app = new App([
  new IndexRoute(),
  new ZombieRoute(),
  new ItemsRoute(),
  new RatesRoute()
]);

app.listen();
