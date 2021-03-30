import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Divider, Grid } from 'semantic-ui-react';
import { useHistory, useLocation } from "react-router-dom";

import Layout from '../../layout/Layout';
import Features from '../../components/Features';
import Profile from '../../components/Profile';
import PokemonListContext from '../../context/PokemonListContext';

import { gql, useQuery } from '@apollo/client';

import { FunctionCatch } from './util';

const GET_POKEMON_DETAIL = gql`
  query pokemon($name: String!) {
    pokemon(name: $name) {
      id
      name
      sprites {
        front_default
      }
      moves {
        move {
          name
        }
      }
      types {
        type {
          name
        }
      }
    }
  }
`;

const PokemonDetail = React.memo(() => {
  const history = useHistory();
  const location = useLocation();

  if (location.pathname.split('/').length < 3 || location.pathname.split('/')[2] === "") history.goBack();

  const { loading, error, data } = useQuery(GET_POKEMON_DETAIL, {
    variables: { name: location.pathname.split('/')[2] },
  });

  return (
    <Layout>
      {!!data && !!data.pokemon.id &&
        <>
          <div style={{ backgroundColor: 'grey', height: '200px', width: '200px', borderRadius: '50%' }}>
            <img src={data.pokemon.sprites.front_default} style={{ width: '200px', height: '200px' }} />
          </div>
          <Divider />
          {(data.pokemon.moves || []).map((val, index) => (
            <div key={index}>
              {val.move.name}
            </div>
          ))}
        </>
      }
    </Layout>
  );
})

export default PokemonDetail;