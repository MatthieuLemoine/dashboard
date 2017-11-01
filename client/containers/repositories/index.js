import { gql, graphql, compose } from 'react-apollo';
import withForm from 'hocs/form';
import Repositories from 'components/repositories';

const getRepositories = gql`
  query getRepositories {
    repositories {
      id
      nameWithOwner
      description
      url
      primaryLanguage {
        id
        name
        color
      }
      issues
      stargazers
      lastRelease {
        id
        name
        description
        createdAt
        url
        author {
          id
          name
          login
        }
      }
    }
  }
`;

const addRepository = gql`
  mutation addRepository($owner: String!, $name: String!) {
    addRepository(owner: $owner, name: $name) {
      id
      nameWithOwner
      description
      url
      primaryLanguage {
        id
        name
        color
      }
      issues
      stargazers
      lastRelease {
        id
        name
        description
        createdAt
        url
        author {
          id
          name
          login
        }
      }
    }
  }
`;

const removeRepository = gql`
  mutation removeRepository($id: String!) {
    removeRepository(id: $id)
  }
`;

export default compose(
  graphql(getRepositories),
  graphql(addRepository, {
    props: ({ mutate }) => ({
      onSubmit: (data) => {
        const [owner, name] = data.name.split('/');
        return mutate({
          variables: { owner, name },
          optimisticResponse: {
            addRepository: {
              __typename: 'Repository',
              id: `__repo${Math.random()}`,
              nameWithOwner: data.name,
              description: '',
              url: '',
              lastRelease: null,
              issues: 0,
              stargazers: 0,
              primaryLanguage: {
                __typename: 'Language',
                id: `__lang${Math.random()}`,
                name: 'JavaScript',
                color: '#f1e05a',
              },
            },
          },
          update: (proxy, { data: { addRepository: repository } }) => {
            const result = proxy.readQuery({ query: getRepositories });
            proxy.writeQuery({
              query: getRepositories,
              data: {
                ...result,
                repositories: [...result.repositories, repository],
              },
            });
          },
        });
      },
    }),
  }),
  graphql(removeRepository, {
    props: ({ mutate }) => ({
      remove: id =>
        mutate({
          variables: { id },
          update: (proxy) => {
            const result = proxy.readQuery({ query: getRepositories });
            proxy.writeQuery({
              query: getRepositories,
              data: {
                ...result,
                repositories: result.repositories.filter(repository => repository.id !== id),
              },
            });
          },
        }),
    }),
  }),
)(withForm(Repositories, { name: '' }));
