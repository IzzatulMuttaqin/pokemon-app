import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Layout from '../../layout/Layout';
import { gql, useQuery } from '@apollo/client';
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { capitalizeFirstLetter } from '../../utils';
import {
  buttonLoadContainer, buttonLoadStyle, cardContainer,
  spinnerContainer, container
} from './Home.Styles';
import { PokemonCard, Spinner } from '../../components';

const GET_POKEMONS = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      count
      next
      previous
      status
      message
      results {
        url
        name
        image
      }
    }
  }
`;

const Home = () => {
  const [gqlVar, updateGqlVar] = useState({
    limit: 10,
    offset: 0,
  });
  const [dataSaved, updateDataSaved] = useState([]);
  const history = useHistory();

  const { loading, error, data, fetchMore } = useQuery(GET_POKEMONS, {
    variables: gqlVar,
  });

  useEffect(() => {
    if (!!data) updateDataSaved([...dataSaved, ...data.pokemons.results]);
  }, [data])

  return (
    <Layout>
      <div css={container}>
        <div css={cardContainer}>
          {
            dataSaved.map((val, index) => (
              <div key={`${index}-${val.name}`}>
                <PokemonCard
                  pushDetail={() => history.push(`/pokemon/${val.name}`)}
                  imageUrl={val.image}
                  name={capitalizeFirstLetter(val.name)}
                />
              </div>
            ))
          }
        </div>
        {
          !!loading &&
          <div css={spinnerContainer}>
            <Spinner />
          </div>
        }
        {!loading && !!data && !!data.pokemons.next && !!fetchMore &&
          <div css={buttonLoadContainer}>
            <div
              onClick={() => {
                updateGqlVar({ ...gqlVar, offset: gqlVar.offset + 10 });
                fetchMore({
                  variables: gqlVar,
                })
              }}
              css={buttonLoadStyle}
            >
              Load More
            </div>
          </div>
        }
        {!!error &&
          <div>
            Something when wrong. Please check again later.
          </div>
        }
      </div>
    </Layout>
  );
};

export default Home;