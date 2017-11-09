import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

//Apollo client configuration
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

//http configuration
const httpLink = new HttpLink({ uri: 'https://api.graph.cool/simple/v1/cj9s7op957h810101moob03if' });

//Apollo client interface configuration
const client = new ApolloClient({
  link: httpLink,
  cache: InMemoryCache()
});

//REactDOM reconfigured for react-apollo client

ReactDOM.render(
  <ApolloClient client={client}>
    <App />
  </ApolloClient>,
  
  document.getElementById('root'));

registerServiceWorker();
