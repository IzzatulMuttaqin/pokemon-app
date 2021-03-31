import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Layout from '../../layout/Layout';
import { gql, useQuery } from '@apollo/client';
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react';
import { capitalizeFirstLetter } from '../../utils';
import {
  buttonLoadContainer, buttonLoadStyle, cardContainer,
  spinnerContainer, container
} from './Home.Styles';

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
              <>
                <div
                  onClick={() => history.push(`/pokemon/${val.name}`)}
                  css={css`
                    box-shadow: 0 2px 5px 0 rgba(0,0,0,0.2);
                    transition: 0.3s;
                    border-radius: 10px;
                    width: 100px;
                    padding-bottom: 10px;
                `}
                  key={index}
                >
                  <div className="image" style={{ height: '100px' }}>
                    <img src={val.image} height={'100px'} />
                  </div>
                  <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
                    {capitalizeFirstLetter(val.name)}
                  </div>
                  <div
                    css={css`
                      background-color: red;
                      width: 70px;
                      margin-top: 5px;
                      font-weight: bold;
                      padding: 2px 5px;
                      border: none;
                      margin-left: auto;
                      margin-right: auto;
                      text-align: center;
                      cursor: pointer;
                      border-radius: 10px;
                      color: white;
                    `}
                  >
                    RELEASE
                  </div>
                </div>
              </>
            ))
          }
        </div>
        {
          !!loading &&
          <div css={spinnerContainer}>
            <Segment style={{ border: 'none', boxShadow: '0 0 0 0 rgba(0,0,0,0)' }}>
              <Dimmer active inverted>
                <Loader inverted content='Loading' />
              </Dimmer>
            </Segment>
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