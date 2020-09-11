
import ApolloClient from 'apollo-boost';
export const apolloClient = new ApolloClient({
    uri: 'http://localhost:8000/graphql/', // your GraphQL Server 
  });