import { makeExecutableSchema } from 'graphql-tools';
import { getCinemas, addCinema, removeCinema } from '../cinema';
import { getScheduleAndResults } from '../football';

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
  type Schedule {
    matchs: [Match]!
  }
  type Match {
    info: String
    result: String
    time: String
    teams: [Team]!
  }
  type Team {
    name: String!
    picture: String!
  }
  # the schema allows the following query:
  type Query {
    cinemas: [Cinema]!
    schedule: Schedule!
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
    schedule: () => getScheduleAndResults(),
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
