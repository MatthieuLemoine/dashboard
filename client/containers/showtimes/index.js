import { gql, graphql } from 'react-apollo';
import Showtimes from 'components/showtimes';

const getCinemas = gql`
  query getCinemas($names: [String]!) {
    cinemas(names: $names) {
      name
      movies {
        title
        showtimes
      }
    }
  }
`;

export default graphql(getCinemas)(Showtimes);
