import { ApolloClient, InMemoryCache, createHttpLink, split } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getMainDefinition } from '@apollo/client/utilities';

import absintheSocketLink from './absinthe-socket-link';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const getHeaders = () => {
  const headers = {
    authorization: '',
  };
  const token = window.localStorage.getItem('token');
  if (token) {
    headers.authorization = `Bearer ${token}`;
  }
  return headers;
};

const httpLink = createHttpLink({
  uri: BASE_URL,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  absintheSocketLink,
  authLink.concat(httpLink)
);

export default new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
  headers: getHeaders(),
});
