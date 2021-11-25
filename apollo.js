import {ApolloClient, makeVar, InMemoryCache, split} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {WebSocketLink} from '@apollo/client/link/ws';
import {createUploadLink} from 'apollo-upload-client';
import {setContext} from '@apollo/client/link/context';
import {onError} from '@apollo/client/link/error';
import {
  getMainDefinition,
  offsetLimitPagination,
} from '@apollo/client/utilities';

export const isLoggedInVar = makeVar(false);
export const tokenVar = makeVar('');

const URI = 'http://localhost:4000/graphql';
const TOKEN = 'token';

export const logUserIn = async token => {
  await AsyncStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
  tokenVar(token);
};

export const logUserOut = async () => {
  await AsyncStorage.removeItem(TOKEN);
  isLoggedInVar(false);
  tokenVar(null);
};

const uploadHttpLink = createUploadLink({
  uri: URI,
});

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/graphql/subscriptions',
  options: {
    reconnect: true,
    connectionParams: () => ({
      token: tokenVar(),
    }),
  },
});

const authLink = setContext((_, {headers}) => {
  return {
    headers: {
      ...headers,
      token: tokenVar(),
    },
  };
});

const onErrorLink = onError(({graphQLErrors, networkError}) => {
  if (graphQLErrors) {
    console.log('GraphQL Error:', graphQLErrors);
  }
  if (networkError) {
    console.log('Network Error', networkError);
  }
});

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        seeTotalArt: offsetLimitPagination,
      },
    },
  },
});

const httpLinks = authLink.concat(onErrorLink).concat(uploadHttpLink);
const splitLink = split(
  ({query}) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLinks,
);

const client = new ApolloClient({
  link: splitLink,
  cache,
});

export default client;
