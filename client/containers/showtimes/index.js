import { gql, graphql, compose } from 'react-apollo';
import withForm from 'hocs/form';
import Showtimes from 'components/showtimes';

const getCinemas = gql`
  query getCinemas {
    cinemas {
      id
      name
      movies {
        title
        showtimes
      }
    }
  }
`;

const addCinema = gql`
  mutation addCinema($name: String!) {
    addCinema(name: $name) {
      id
      name
      movies {
        title
        showtimes
      }
    }
  }
`;

const removeCinema = gql`
  mutation removeCinema($id: String!) {
    removeCinema(id: $id)
  }
`;

export default compose(
  graphql(getCinemas),
  graphql(addCinema, {
    props: ({ mutate }) => ({
      onSubmit: data =>
        mutate({
          variables: { name: data.name },
          optimisticResponse: {
            addCinema: {
              __typename: 'Cinema',
              id: +Math.random(),
              name: data.name,
              movies: [],
            },
          },
          update: (proxy, { data: { addCinema: cinema } }) => {
            const result = proxy.readQuery({ query: getCinemas });
            proxy.writeQuery({
              query: getCinemas,
              data: {
                ...result,
                cinemas: [...result.cinemas, cinema],
              },
            });
          },
        }),
    }),
  }),
  graphql(removeCinema, {
    props: ({ mutate }) => ({
      remove: id =>
        mutate({
          variables: { id },
          update: (proxy) => {
            const result = proxy.readQuery({ query: getCinemas });
            proxy.writeQuery({
              query: getCinemas,
              data: {
                ...result,
                cinemas: result.cinemas.filter(cinema => cinema.id !== id),
              },
            });
          },
        }),
    }),
  }),
)(withForm(Showtimes, { name: '' }));
