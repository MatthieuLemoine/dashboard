// Will be run every day by pm2 using process.json
const { request } = require('graphql-request');

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

request(URL, query)
  .then(() => process.stdout.write('Showtimes updated\n'))
  .catch(console.error);
