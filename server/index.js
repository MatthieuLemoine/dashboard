const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const schema = require('../schema');

const PORT = process.env.PORT || 3000;
const app = express();

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
if (process.env.NODE_ENV !== 'production') {
  app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
}

app.listen(PORT);
