import React, { PropTypes } from 'react';

import { 
  Navigation,
  Header 
} from './components/index';

import './App.css';

const propTypes = {
  numberOfItemsInCart: PropTypes.number.isRequired,
  recipes: PropTypes.array.isRequired
};

const defaultTypes = {
  numberOfItemsInCart: 0,
  recipes: []
};

export default function App(props) {
  return (
    <div className="App">
      <Header />
      <Navigation />
      { props.children }
    </div>
  );
}

App.defaultTypes = defaultTypes;
App.propTypes = propTypes;
