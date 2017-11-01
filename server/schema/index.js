import { makeExecutableSchema } from 'graphql-tools';
import { getCinemas, addCinema, removeCinema } from '../cinema';
import { getScheduleAndResults } from '../football';
import { getRepositories, addRepository, removeRepository } from '../github';

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
  type Repository {
    id: String!
    nameWithOwner: String!
    description: String!
    url: String!
    primaryLanguage: Language
    issues: Int!
    stargazers: Int!
    lastRelease: Release
  }
  type Language {
    id: String!
    name: String!
    color: String!
  }
  type Release {
    id: String!
    name: String!
    description: String!
    createdAt: String!
    url: String!
    author: User!
  }
  type User {
    id: String!
    name: String!
    login: String!
  }
  # the schema allows the following query:
  type Query {
    cinemas: [Cinema]!
    schedule: Schedule!
    repositories: [Repository]!
  }
  # this schema allows the following mutation:
  type Mutation {
    addCinema (
      name: String!
    ): Cinema
    removeCinema (
      id: String!
    ): Boolean
    addRepository (
      owner: String!
      name: String!
    ): Repository
    removeRepository (
      id: String!
    ): Boolean
  }
`;

const resolvers = {
  Query: {
    cinemas: () => getCinemas(),
    schedule: () => getScheduleAndResults(),
    repositories: () => getRepositories(),
  },
  Mutation: {
    addCinema: (_, { name }) => addCinema(name),
    removeCinema: (_, { id }) => removeCinema(id),
    addRepository: (_, { owner, name }) => addRepository(owner, name),
    removeRepository: (_, { id }) => removeRepository(id),
  },
  Cinema: {
    movies: cinema => cinema.movies,
  },
};

export default makeExecutableSchema({
  typeDefs,
  resolvers,
});
