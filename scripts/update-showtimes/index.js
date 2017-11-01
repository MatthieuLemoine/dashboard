// Will be run every day by pm2 using process.json

// eslint-disable-next-line no-global-assign
require = require('@std/esm')(module, { cjs: true, esm: 'js' });

const { request } = require('graphql-request');
const logger = require('../../server/logger').default;

const PORT = process.env.PORT || 3888;
const URL = `http://localhost:${PORT}/graphql`;

const query = `{
  cinemas {
    id
    name
    movies {
      title
      showtimes
    }
  }
}`;

logger.info('Script started');
run();

async function run(retries = 0) {
  try {
    await request(URL, query);
    logger.info('Showtimes updated !');
  } catch (e) {
    if (retries >= 10) {
      logger.error(`Request has failed ${retries} times. Giving up.`);
      return;
    }
    logger.error(`Request has failed. Retry number ${retries + 1}.`);
    // Retry in 10 minuues
    setTimeout(() => run(retries + 1), 600000);
  }
}
