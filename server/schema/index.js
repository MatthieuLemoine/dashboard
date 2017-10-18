import { makeExecutableSchema } from 'graphql-tools';
import { getCinemas, addCinema, removeCinema } from '../cinema';

const typeDefs = `
  type Cinema {
    id: String!
    name: String!
    movies: [Movie]!
  }
  type Movie {
    title: String!
    showtimes: [String]!
  }
  # the schema allows the following query:
  type Query {
    cinemas: [Cinema]!
  }
  # this schema allows the following mutation:
  type Mutation {
    addCinema (
      name: String!
    ): Cinema
    removeCinema (
      id: String!
    ): Boolean
  }
`;

const resolvers = {
  Query: {
    cinemas: () => getCinemas(),
  },
  Mutation: {
    addCinema: (_, { name }) => addCinema(name),
    removeCinema: (_, { id }) => removeCinema(id),
  },
  Cinema: {
    movies: cinema => cinema.movies,
  },
};

export default makeExecutableSchema({
  typeDefs,
  resolvers,
});
