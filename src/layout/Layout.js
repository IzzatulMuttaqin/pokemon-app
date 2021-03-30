import React from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import { pullRight, h1 } from './layout.css';
import PokemonListContext from '../context/PokemonListContext';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Layout = ({ children }) => {
  let history = useHistory();
  return (
    <div>
      <div className="ui fixed borderless huge menu">
        <div className="ui container grid">

          <div className="computer only row">
            <a className="header item" onClick={() => history.push('/')}>Pokemon Adventure</a>
            <div className="right menu">
              <a className="item">My Pokemon: 0</a>
            </div>
          </div>

          <div className="tablet mobile only row">
            <a className="header item" onClick={() => history.push('/')}>Pokemon Adventure</a>
            <div className="right menu">
              <a className="item">My Pokemon: 0</a>
            </div>
          </div>
        </div>
      </div>
      <div css={css`
          height: 50px;
      `} />
      {children}
    </div >
  );
};

export default Layout;
