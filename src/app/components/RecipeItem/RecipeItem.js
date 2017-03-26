import React, { PropTypes } from 'react';
import { push } from 'react-router-redux';

import { Col } from 'react-bootstrap';

import './RecipeItem.css';

const propTypes = {
  imageName: PropTypes.string.isRequired
};

export default function RecipeItem(props) {
  const handleClick = () => {
    props.dispatch(push(`/recipes/${props.recipeId}`));
  };

  return (
    <Col xs={6} sm={4} md={3} lg={3} 
      className="Recipe-Item" 
      onClick={ handleClick }
    >
      <img 
        src={ process.env.PUBLIC_URL + '/img/' + props.imageName }
        alt={ props.imageName }
      />
    </Col>
  );
}

RecipeItem.propTypes = propTypes;