

export default function createApolloClient() {

  const [IDToken, setIDToken] = useState('')

  const GRAPHQL_API_URL = Constants.manifest?.extra?.graphQLURL;

  const httpLink = createHttpLink({
    uri: GRAPHQL_API_URL,
    options: {
      reconnect: true,
    },
  });

  const authLink = setContext(async (_, { headers }) => {
      async function loadStorageData() {
        try {
          const IDTokenSerialized = await AsyncStorage.getItem('@IDToken');
          if (IDTokenSerialized) {
            const _IDToken = JSON.parse(IDTokenSerialized);
            console.log("LOADING TOKEN FROM STORE")
            console.log(_IDToken)
            console.log("____________")
            setIDToken(_IDToken);
          }
        } catch (error) {
          console.log("ERROR: loading token from async storage. ", error)
        } 
    }
    await loadStorageData()
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        "X-Auth-Token": IDToken,
      },
    };
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });
}
