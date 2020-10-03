
import ApolloClient  from 'apollo-client';
import {createHttpLink} from 'apollo-link-http';
import {InMemoryCache} from "apollo-cache-inmemory"
import { setContext } from 'apollo-link-context'
import {REFRESH_TOKEN} from "./api/login/index"
///import { onError } from "apollo-link-error";
//import { ApolloLink, Observable } from 'apollo-link';
const httpLink = createHttpLink({
  uri: 'http://localhost:8000/graphql/',
});

const getNewToken = () => {
  return apolloClient.mutate({ mutation: REFRESH_TOKEN ,
      variables : { token :localStorage.getItem('jwt') }}).then((response) => {
    // extract your accessToken from your response data and return it
    console.log(response)
  });
};


const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  getNewToken()
  const token = localStorage.getItem('jwt');
  // return the headers to the context so httpLink can read them
  console.log("my errors ", _)
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