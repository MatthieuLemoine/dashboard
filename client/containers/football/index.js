import { gql, graphql } from 'react-apollo';
import Football from 'components/football';

const getSchedule = gql`
  query getSchedule {
    schedule {
      matchs {
        info
        result
        time
        teams {
          name
          picture
        }
      }
    }
  }
`;

export default graphql(getSchedule)(Football);
