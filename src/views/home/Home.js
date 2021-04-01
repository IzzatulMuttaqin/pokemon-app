import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Layout from '../../layout/Layout';
import { gql, useQuery } from '@apollo/client';
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import _ from 'lodash';
import { capitalizeFirstLetter, useWindowDimensions } from '../../utils';
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
  const { width } = useWindowDimensions();
  const [gqlVar, updateGqlVar] = useState({
    limit: 12,
    offset: 0,
  });
  const [dataSaved, updateDataSaved] = useState([]);
  const history = useHistory();

  const { loading, error, data, fetchMore } = useQuery(GET_POKEMONS, {
    variables: gqlVar,
  });

  useEffect(() => {
    if (!!data) {
      const combined = [...dataSaved, ...data.pokemons.results];
      const filtered = _.uniqBy(combined, (e => { return e.name }))
      updateDataSaved(filtered);
    }
  }, [data, width])

  const viewingWidth = Math.round(width * 0.9);
  const marginLeft = Math.round(width * 0.05);

  console.log(
    'width: ', width, 'containerWidth: ',
    viewingWidth, 'marginWidth: ', marginLeft);

  return (
    <Layout>
      <div css={[container,
        {
          width: `${width < 300 ? `${viewingWidth}px` : '90%'}`,
          marginLeft: `${width < 300 ? `${marginLeft}px` : '5%'}`,
          marginRight: `${width < 300 ? `${marginLeft}px` : '5%'}`,
        }]}>
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
                try {
                  updateGqlVar({ ...gqlVar, offset: gqlVar.offset + 12 });
                  fetchMore({
                    variables: gqlVar,
                  })
                } catch {
                  updateGqlVar({ ...gqlVar, offset: gqlVar.offset - 12 });
                }
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