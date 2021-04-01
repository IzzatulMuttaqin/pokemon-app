import React, { useState, useEffect, useContext } from 'react';
import { Divider } from 'semantic-ui-react';
import { useHistory, useLocation } from "react-router-dom";
import Layout from '../../layout/Layout';
import { gql, useQuery } from '@apollo/client';
import { Icon } from 'semantic-ui-react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { PokemonContext } from '../../context/PokemonListContext';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import {
  alertBody, buttonsOnTopContainer,
  alertWarning, container, divFiller, pokemonName,
  skillAbilities, titleStyles, typeStyles, cursorPointer, buttonCatchStyle,
  skillsContainer, pictContainer, pictBg, pictStyle
} from './PokemonDetail.Styles';
import { capitalizeFirstLetter, useWindowDimensions } from '../../utils';
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { Spinner } from '../../components';

const GET_POKEMON_DETAIL = gql`
  query pokemon($name: String!) {
    pokemon(name: $name) {
      id
      name
      sprites {
        front_default
      }
      abilities {
        ability {
          name
        }
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
      message
      status
    }
  }
`;

const PokemonDetail = React.memo(() => {
  const history = useHistory();
  const { width } = useWindowDimensions();
  const location = useLocation();
  const [show, setShow] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertSuccess, setAlertSuccess] = useState(false);
  const { poke, setPoke } = useContext(PokemonContext);
  const [nickname, setNickname] = useState('');
  const [validMsg, setValidMsg] = useState('');
  const [validated, setValidated] = useState(false);

  if (location.pathname.split('/').length < 3 || location.pathname.split('/')[2] === "") history.replace('/');

  const { loading, error, data } = useQuery(GET_POKEMON_DETAIL, {
    variables: { name: location.pathname.split('/')[2] },
  });

  const handleClose = () => { setShow(false); setAlert(true); };

  const onChangeForm = (event) => {
    if (event.target.value.trim() === '') {
      setValidMsg("Nickname can't be empty.");
      setValidated(false);
    } else {
      setValidMsg("");
      setValidated(true);
    }
    setNickname(event.target.value);
  }

  const checkValidation = () => {
    if (nickname.trim() === '') return false;

    const data = poke.filter(p => p.nickname === nickname.toLowerCase());

    if (!!data && data.length > 0) {
      setValidMsg("There are already pokemon with the same nickname.");
      setValidated(false);
      return false;
    }

    setValidated(true);
    return true;
  }

  const onSubmit = () => {
    const valid = checkValidation();

    if (!valid) return;

    const dataInsert = {
      name: data.pokemon.name,
      image: data.pokemon.sprites.front_default,
      nickname: nickname.toLowerCase(),
    }

    setPoke({ type: 'insert', data: dataInsert });
    setShow(false);
    setAlertSuccess(true);
  }

  const generateProbility = () => {
    const rdm = Math.random();

    if (rdm < 0.5) {
      setAlert(true);
    } else {
      setNickname(''); setValidMsg(''); setValidated(false);
      setShow(true);
    }
  }

  const viewingWidth = Math.round(width * 0.9);
  const marginLeft = Math.round(width * 0.05);
  const alertBodyWidth = width < 400 ? viewingWidth : Math.round(width * 0.5);

  console.log(
    'width: ', width, 'containerWidth: ',
    viewingWidth, 'marginWidth: ', marginLeft);

  return (
    <Layout>
      <div css={[container, {
        width: `${width < 300 ? viewingWidth : '90%'}`,
        marginLeft: `${width < 300 ? marginLeft : '5%'}`,
        marginRight: `${width < 300 ? marginLeft : '5%'}`,
      }]}>
        {!!data && !!data.pokemon.id &&
          <>
            {
              alert &&
              <div css={[alertWarning, { width: `${viewingWidth}px` }]}>
                <Alert css={[alertBody, { width: `${alertBodyWidth}px` }]} variant="danger"
                  onClose={() => setAlert(false)} dismissible>
                  <Alert.Heading>Oh snap!</Alert.Heading>
                  <p>
                    {capitalizeFirstLetter(data.pokemon.name)} got away.
                    Better luck next time!
                </p>
                </Alert>
              </div>
            }

            {alertSuccess &&
              <div css={[alertWarning, { width: `${viewingWidth}px` }]}>
                <Alert css={[alertBody, { width: `${alertBodyWidth}px` }]} variant="success"
                  onClose={() => setAlertSuccess(false)} dismissible>
                  <Alert.Heading>Yippe!</Alert.Heading>
                  <p>
                    {capitalizeFirstLetter(nickname)}, a {`${capitalizeFirstLetter(data.pokemon.name)} `}
                    is stored at your computer.
                </p>
                </Alert>
              </div>
            }

            <div css={buttonsOnTopContainer}>
              <Icon name='arrow alternate circle left outline' size='big' css={cursorPointer}
                onClick={() => history.goBack()}
                disabled={alert || alertSuccess}
              />
              {!location.state?.mine &&
                <div css={[buttonCatchStyle,
                  { backgroundColor: alertSuccess || alert ? 'grey' : 'green' }]}
                  onClick={generateProbility}>
                  <img
                    alt="image"
                    src="/pokeball.png"
                    width="20"
                    height="20"
                    style={{ marginBottom: '2%' }}
                  />{' '}
                  Catch
                </div>
              }
            </div>

            <Divider />

            <div css={pictContainer}>
              <div css={pictBg}>
                <img src={data.pokemon.sprites.front_default} css={pictStyle} />
              </div>

              <div css={pokemonName}>
                {capitalizeFirstLetter(location.state?.nickname || data.pokemon.name || "")}
              </div>

              <div css={skillsContainer}>
                {(data.pokemon.types || []).map((val, index) => (
                  <div key={`${index}-types`}
                    css={typeStyles}
                  >
                    {capitalizeFirstLetter(val.type.name.split('-').join(' '))}
                  </div>
                ))}
              </div>
            </div>

            <Divider />

            <div css={titleStyles}>
              Abilities List:
            </div>

            <div css={skillsContainer}>
              {(data.pokemon.abilities || []).map((val, index) => (
                <div key={`${index}-abilities`}
                  css={skillAbilities}
                >
                  {capitalizeFirstLetter(val.ability.name.split('-').join(' '))}
                </div>
              ))}
            </div>

            <div css={divFiller} />

            <div css={titleStyles}>
              Skill List:
            </div>

            <div css={skillsContainer}>
              {(data.pokemon.moves || []).map((val, index) => (
                <div key={`${index}-moves`}
                  css={skillAbilities}
                >
                  {capitalizeFirstLetter(val.move.name.split('-').join(' '))}
                </div>
              ))}
            </div>
            <div css={divFiller} />
          </>
        }

        {!!loading &&
          <div>
            <Spinner />
          </div>
        }

        {!!error &&
          <div>
            Something when wrong. Please check again later.
        </div>
        }
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Body>
          <Form noValidate
            onKeyPress={(event) => {
              if (event.key.toLowerCase() === 'enter') {
                event.preventDefault();
                onSubmit();
              }
            }}
          >
            <Form.Label>
              Please enter a nickname for your {data?.pokemon?.name || ''}
            </Form.Label>
            <Form.Control type="text" placeholder={data?.pokemon?.name || ''}
              required value={nickname}
              onChange={onChangeForm}
              isInvalid={!validated}
            />
            <Form.Control.Feedback type="invalid">
              {validMsg}
            </Form.Control.Feedback>
          </Form>
          <div css={divFiller} />
          <div className="float-right">
            <Button variant="secondary" onClick={handleClose}>Close</Button>
            {' '}
            <Button variant="success" onClick={onSubmit}>Confirm</Button>
          </div>
        </Modal.Body>
      </Modal>

    </Layout>
  );
})

export default PokemonDetail;