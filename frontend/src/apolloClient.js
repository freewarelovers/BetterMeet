
import ApolloClient  from 'apollo-client';
import {createHttpLink} from 'apollo-link-http';
import {InMemoryCache} from "apollo-cache-inmemory"
import { setContext } from 'apollo-link-context'
import { fromPromise} from "apollo-link"
import {REFRESH_TOKEN} from "./api/login/index"
import { onError } from "apollo-link-error";
///import { onError } from "apollo-link-error";
//import { ApolloLink, Observable } from 'apollo-link';
const httpLink = createHttpLink({
  uri: 'http://localhost:8000/graphql/',
});



const getNewToken = () => {
  apolloClient.mutate({ mutation: REFRESH_TOKEN ,
    variables : { token :localStorage.getItem('jwt') }}).then((response) => {
    // extract your accessToken from your response data and return it
    const { token } = response.data.data.refreshToken;
    console.log("im refreshhing the toke", token)
    return token;
  });
};

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        switch (err.extensions.code) {
          case "UNAUTHENTICATED":
            return fromPromise(
              getNewToken().catch((error) => {
                window.location.href = "/signin"
                return;
              })
            )
              .filter((value) => Boolean(value))
              .flatMap((accessToken) => {
                const oldHeaders = operation.getContext().headers;
                // modify the operation context with a new token
                operation.setContext({
                  headers: {
                    ...oldHeaders,
                    authorization: `JWT ${accessToken}`,
                  },
                });

                // retry the request, returning the new observable
                return forward(operation);
              });
        }
      }
    }
  }
);

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
    link: authLink.concat(httpLink).concat(errorLink),
    cache: new InMemoryCache()
});