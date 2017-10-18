import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import schema from './schema';
import { init } from './cinema';

const PORT = process.env.PORT || 3888;
const app = express();
init();

app.use(express.static(path.join(__dirname, '..', 'dist')));

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
if (process.env.NODE_ENV !== 'production') {
  app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
}

app.listen(PORT, () => process.stdout.write(`Server started on port ${PORT}`));
