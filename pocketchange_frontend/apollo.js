import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
 import { setContext } from '@apollo/client/link/context';
 import Constants from 'expo-constants';



// see: https://github.com/graphql/swapi-graphql
const GRAPHQL_API_URL = Constants.manifest?.extra?.graphQLURL;

const authLink = setContext((_, {headers}) => {
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})



/*
uncomment the code below in case you are using a GraphQL API that requires some form of
authentication. asyncAuthLink will run every time your request is made and use the token
you provide while making the request.


const TOKEN = '';
const asyncAuthLink = setContext(async () => {
  return {
    headers: {
      Authorization: TOKEN,
    },
  };
});

*/


export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  uri: GRAPHQL_API_URL
  //uri: 'http://f0fd-2607-fea8-5e3-2900-a5b8-52f5-3821-e23d.ngrok.io/graphql'
  //link: httpLink,
  // link: asyncAuthLink.concat(httpLink),
});
