import { LinkContainer } from 'react-router-bootstrap';
import React from 'react';

import {
  NavItem,
  Navbar,
  Nav
} from 'react-bootstrap';

import './Navigation.css';

export default function Navigation(props) {
  return (
    <nav className="App-Nav">
      <Navbar>
        <Nav>
          <LinkContainer to={{ pathname: '/' }}>
            <NavItem className="App-Nav-Title" eventKey={1} href="#">Shop</NavItem>
          </LinkContainer>
        </Nav>
      </Navbar>
    </nav>
  );
}
