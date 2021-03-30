import React, { useState } from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import importedComponent from 'react-imported-component';
import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink } from '@apollo/client';

import Home from '../views/home/Home'
import Loading from '../components/Loading';
import PokemonDetail from '../views/pokemon-detail/PokemonDetail';
import PokemonListContext from '../context/PokemonListContext';

const AsyncDynamicPAge = importedComponent(
  () => import(/* webpackChunkName:'DynamicPage' */ '../views/dynamic-page/DynamicPage'),
  {
    LoadingComponent: Loading
  }
);
const AsyncNoMatch = importedComponent(
  () => import(/* webpackChunkName:'NoMatch' */ '../views/no-match/NoMatch'),
  {
    LoadingComponent: Loading
  }
);

const createApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri: 'https://graphql-pokeapi.vercel.app/api/graphql',
    }),
    cache: new InMemoryCache(),
  });
}

const RouterApp = () => {
  const client = createApolloClient();

  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/dynamic" component={AsyncDynamicPAge} />
            <Route path="/pokemon/" component={PokemonDetail} />
            <Route component={AsyncNoMatch} />
          </Switch>
        </div>
      </Router>
    </ApolloProvider>
  );
};

export default RouterApp;
