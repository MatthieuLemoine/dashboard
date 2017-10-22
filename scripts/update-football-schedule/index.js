// Will be run every day by pm2 using process.json
const chalk = require('chalk');
const { request } = require('graphql-request');

const PORT = process.env.PORT || 3888;
const URL = `http://localhost:${PORT}/graphql`;

const query = `{
  schedule {
    matchs {
      info
      result
      time
      teams {
        name
        picture
      }
    }
  }
}`;

update()
  .then(() => console.log(chalk.green('Football schedule updated')))
  .catch(console.error);

function update() {
  return request(URL, query).catch(() => {
    console.log(chalk.yellow('Error while scraping football schedule, retrying...'));
    return update();
  });
}
