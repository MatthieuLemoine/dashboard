import fs from 'fs';
import path from 'path';
import { GraphQLClient } from 'graphql-request';
import isToday from 'date-fns/is_today';
import db from '../db';

const token = fs
  .readFileSync(path.join(__dirname, '..', '..', 'access.token'), {
    encoding: 'utf8',
  })
  .replace('\n', '');
const endpoint = 'https://api.github.com/graphql';

const client = new GraphQLClient(endpoint, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const repositoryQuery = `query getRepository($name: String!, $owner: String!) {
  repository(name: $name, owner: $owner) {
    id
    nameWithOwner
    description
    url
    primaryLanguage {
      id
      name
      color
    }
    issues(states: [OPEN]) {
      totalCount
    }
    stargazers {
      totalCount
    }
    releases(last: 10) {
      edges {
        node {
          id
          name
          description
          createdAt
          isDraft
          isPrerelease
          url
          author {
            id
            name
            login
          }
        }
      }
    }
  }
}`;

export async function getRepositories() {
  const lastFetch = db.get('github.lastFetch').value();
  const savedRepositories = db.get('github.repositories').value() || [];
  if (lastFetch && isToday(new Date(lastFetch))) {
    return savedRepositories;
  }
  const repositories = await Promise.all(savedRepositories.map(({ owner, name }) => getRepository(owner, name)));
  storeRepositories(repositories);
  return repositories;
}

export async function getRepository(owner, name) {
  const response = await client.request(repositoryQuery, { owner, name });
  const { repository } = response;
  return {
    ...repository,
    issues: repository.issues.totalCount,
    stargazers: repository.stargazers.totalCount,
    lastRelease: repository.releases.edges
      .map(item => item.node)
      .filter(item => !item.isPrerelease)
      .sort((a, b) => b.createdAt >= a.createdAt)[0],
    releases: undefined,
  };
}

export async function addRepository(owner, name) {
  const match = db
    .get('github.repositories')
    .find({ owner, name })
    .value();
  if (match) {
    return match;
  }
  const repository = await getRepository(owner, name);
  db
    .get('github.repositories')
    .push(repository)
    .write();
  return repository;
}

export function removeRepository(id) {
  db
    .get('github.repositories')
    .remove({ id })
    .write();
}

function storeRepositories(repositories) {
  db.set('github.lastFetch', new Date()).write();
  db.set('github.repositories', repositories).write();
}
