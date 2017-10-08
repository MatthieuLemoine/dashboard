const { makeExecutableSchema } = require('graphql-tools');
const { getCinemas } = require('../cinema');

const typeDefs = `
  type Cinema {
    name: String!
    movies: [Movie]!
  }
  type Movie {
    title: String!
    showtimes: [String]!
  }
  # the schema allows the following query:
  type Query {
    cinemas(names: [String]!): [Cinema]
  }
`;

const resolvers = {
  Query: {
    cinemas: (_, { names }) => getCinemas(names),
  },
  Cinema: {
    movies: cinema => cinema.movies,
  },
};

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers,
});
