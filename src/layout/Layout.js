import React, { useContext, useEffect } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import { pullRight, h1 } from './layout.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import useLocalStorage from '../utils/UseLocalStorage';
import { PokemonContext } from '../context/PokemonListContext';

const Layout = ({ children }) => {
  let history = useHistory();
  const { poke, setPoke } = useContext(PokemonContext);

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" fixed="top" style={{ backgroundColor: '#ffcb05', fontWeight: 'bold' }}>
        <Navbar.Brand onClick={() => history.push('/')} style={{ cursor: 'pointer' }}>
          <img
            alt="image"
            src="/pokeball.png"
            width="20"
            height="20"
            style={{ marginBottom: '2%' }}
          />{' '}
          Pokemon
        </Navbar.Brand>
        <Nav className="mr-auto">
          {(poke || []).length} Caught
        </Nav>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto" />
          <Nav>
            <Nav.Link onClick={() => history.push('/my-pokemon')}>My Pokemon List</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div css={css`
          height: 50px;
      `} />
      {children}
    </div >
  );
};

export default Layout;
