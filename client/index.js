import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, ApolloProvider } from 'react-apollo';
import Dashboard from 'components/dashboard';

require('theme');

const client = new ApolloClient();

ReactDOM.render(
  <ApolloProvider client={client}>
    <Dashboard />
  </ApolloProvider>,
  document.getElementById('root'),
);
