import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Layout from '../../layout/Layout';
import { gql, useQuery } from '@apollo/client';
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'

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

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

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
      <div css={css`
          width: 90%;
          margin-left: 5%;
          margin-right: 5%;
          padding-top: min(25px, 5%);
          padding-bottom: min(25px, 5%);
        `}
      >
        <div css={css`
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(100px, 0fr));
          grid-gap: .85rem;
          justify-content: space-around;
        `}
        >
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
                    cursor: pointer;
                    padding-bottom: 10px;
                `}
                  key={index}
                >
                  <div class="image" style={{ height: '100px' }}>
                    <img src={val.image} height={'100px'} />
                  </div>
                  <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
                    {capitalizeFirstLetter(val.name)}
                  </div>
                </div>
              </>
            ))
          }
        </div>
        {
          !!loading &&
          <div>
            <Segment style={{ border: 'none', boxShadow: '0 0 0 0 rgba(0,0,0,0)', marginTop: '5px', height: '75px' }}>
              <Dimmer active inverted>
                <Loader inverted content='Loading' />
              </Dimmer>
            </Segment>
          </div>
        }
        {!loading && !!data && !!data.pokemons.next && !!fetchMore &&
          <div style={{ marginTop: '25px', marginBottom: '20px' }}>
            <div
              onClick={() => {
                updateGqlVar({ ...gqlVar, offset: gqlVar.offset + 10 });
                fetchMore({
                  variables: gqlVar,
                })
              }}
              css={css`
                  background-color: #ffcb05;
                  width: max(10%, 100px);
                  margin: auto;
                  font-weight: bold;
                  padding: 10px;
                  border: none;
                  margin-left: auto;
                  margin-right: auto;
                  text-align: center;
                  cursor: pointer;
                  border-radius: max(.5%, 5px)
                `}
            >
              Load More
            </div>
          </div>
        }
      </div>
    </Layout>
  );
};

export default Home;