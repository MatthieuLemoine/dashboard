import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, ApolloProvider } from 'react-apollo';
import Application from 'components/application';

const client = new ApolloClient();

ReactDOM.render(
  <ApolloProvider client={client}>
    <Application />
  </ApolloProvider>,
  document.getElementById('root'),
);
