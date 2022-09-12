import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
// import { setContext } from '@apollo/link-context';

const LOCAL_SYSTEM_IP_ADDRESS = '10.0.0.188';
const PORT = '4000';

// see: https://github.com/graphql/swapi-graphql
const GRAPHQL_API_URL = 'http://localhost:${PORT}';

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

const httpLink = new HttpLink({
  uri: GRAPHQL_API_URL,
});

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'http://860d-2607-fea8-5e3-2900-e5b5-ebd4-474b-5fa5.ngrok.io/graphql'
  //link: httpLink,
  // link: asyncAuthLink.concat(httpLink),
});
