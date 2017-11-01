import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import schema from './schema';
import getBrowser from './browser';
import { init as initCinema } from './cinema';
import { init as initFootball } from './football';
import logger from './logger';

const PORT = process.env.PORT || 3888;
const app = express();

app.use(express.static(path.join(__dirname, '..', 'dist')));

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
if (process.env.NODE_ENV !== 'production') {
  app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
}

try {
  setup();
} catch (e) {
  logger.error(e);
}

async function setup() {
  const browser = await getBrowser();
  initCinema(browser);
  initFootball(browser);
  app.listen(PORT, () => logger.info(`Server started on port ${PORT}`));
}
