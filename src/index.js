import React from 'react';
import ReactDOM from 'react-dom';
import '../src/styles/index.css';
import App from '../src/components/App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import { GC_AUTH_TOKEN } from './constants';
import { ApolloLink } from 'apollo-client-preset';

//Apollo client configuration
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

//http configuration
const httpLink = new HttpLink({ uri: 'https://api.graph.cool/simple/v1/cj9s7op957h810101moob03if' });

const middlewareAuthLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem(GC_AUTH_TOKEN);
  const authorizationHeader = token ? `Bearer ${token}` : null
  operation.setContext({
    headers: {
      authorization: authorizationHeader
    }
  });
  return forward(operation);
});

const httpLinkWithAuthToken = middlewareAuthLink.concat(httpLink);

//Apollo client interface configuration
const client = new ApolloClient({
  link: httpLinkWithAuthToken,
  cache: new InMemoryCache()
});

//REactDOM reconfigured for react-apollo client

ReactDOM.render(
  <BrowserRouter>

    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>

  </BrowserRouter>,
  
  document.getElementById('root'));

registerServiceWorker();
