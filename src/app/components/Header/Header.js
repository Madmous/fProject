import React, { PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router';

import './Header.css';

const propTypes = {
  numberOfItemsInCart: PropTypes.number.isRequired
};

const defaultTypes = {
  numberOfItemsInCart: 0
};

export default function Header(props) {
  const getNumberOfItemsInCart = () => {
    const { numberOfItemsInCart } = props;

    if (numberOfItemsInCart > 0) {
      return (
        <span 
          className="Header-Cart-Total"  
        >
          { numberOfItemsInCart }
        </span>
      );
    }
  };

  return (
    <div className="Header">
      <h1>Recipes to list</h1>
      <span className="Header-Cart">
        <Link to={`/cart`}>
          <FontAwesome
            className='Header-Cart-Icon'
            name='shopping-cart'
            size='lg'
          />
          { getNumberOfItemsInCart() }
        </Link>
      </span>
    </div>
  );
}

Header.defaultTypes = defaultTypes;
Header.propTypes = propTypes;