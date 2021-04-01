import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import Layout from '../../layout/Layout';
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { capitalizeFirstLetter, useWindowDimensions } from '../../utils';
import { cardContainer, container } from '../home/Home.Styles';
import { PokemonCard } from '../../components';
import { PokemonContext } from '../../context/PokemonListContext';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { divFiller } from '../pokemon-detail/PokemonDetail.Styles';

const MyPokemon = () => {
    const { width } = useWindowDimensions();
    const { poke, setPoke } = useContext(PokemonContext);
    const [show, setShow] = useState(false);
    const [detailDelete, setDetailDelete] = useState(undefined);
    const history = useHistory();

    const handleClose = () => setShow(false);
    const onSubmit = () => {
        setPoke({ type: 'remove', data: detailDelete });
        setShow(false);
    }

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
                        poke.map((val, index) => (
                            <div key={`${index}-${val.name}`}>
                                <PokemonCard
                                    pushDetail={() => history.push(`/pokemon/${val.name}`,
                                        { nickname: val.nickname, mine: true })}
                                    imageUrl={val.image}
                                    name={capitalizeFirstLetter(val.nickname)}
                                    remove={() => { setDetailDelete(val); setShow(true) }}
                                />
                            </div>
                        ))
                    }
                </div>

                {poke.length === 0 &&
                    <div>
                        Please catch a few pokemon first.
                    </div>
                }

                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                    centered
                >
                    <Modal.Body>
                        <span>
                            Are you sure to release
                            <span style={{ fontWeight: 'bold' }}>{` ${capitalizeFirstLetter(detailDelete?.nickname || '')}`}</span>
                            , a
                            <span style={{ fontWeight: 'bold' }}>{` ${capitalizeFirstLetter(detailDelete?.name || '')}`}</span>?
                        </span>
                        <div css={divFiller} />
                        <div className="float-right">
                            <Button variant="success" onClick={handleClose}>
                                No
                            </Button>{' '}
                            <Button variant="danger" onClick={onSubmit}>Yes</Button>
                        </div>
                    </Modal.Body>
                    {/* <Modal.Footer>
                        <Button variant="success" onClick={handleClose}>
                            No
                        </Button>
                        <Button variant="danger" onClick={onSubmit}>Yes</Button>
                    </Modal.Footer> */}
                </Modal>
            </div>
        </Layout>
    );
};

export default MyPokemon;