
import ApolloClient  from 'apollo-client';
import {createHttpLink} from 'apollo-link-http';
import {InMemoryCache} from "apollo-cache-inmemory"
import { setContext } from 'apollo-link-context';
///import { onError } from "apollo-link-error";
//import { ApolloLink, Observable } from 'apollo-link';
const httpLink = createHttpLink({
  uri: 'http://localhost:8000/graphql/',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  
  const token = localStorage.getItem('jwt');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authorization: token ? "JWT "+token : "",
    }
  }
});


export const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});