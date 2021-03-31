import React from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import importedComponent from 'react-imported-component';
import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink } from '@apollo/client';
import Home from '../views/home/Home'
import PokemonDetail from '../views/pokemon-detail/PokemonDetail';
import MyPokemon from '../views/my-pokemon/MyPokemon';
import { PokemonProvider } from '../context/PokemonListContext';

const AsyncNoMatch = importedComponent(
  () => import(/* webpackChunkName:'NoMatch' */ '../views/no-match/NoMatch'),
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
    <PokemonProvider>
      <ApolloProvider client={client}>
        <Router>
          <div>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/pokemon/" component={PokemonDetail} />
              <Route exact path="/my-pokemon" component={MyPokemon} />
              <Route component={AsyncNoMatch} />
            </Switch>
          </div>
        </Router>
      </ApolloProvider>
    </PokemonProvider>
  );
};

export default RouterApp;
