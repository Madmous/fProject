import React, { PropTypes }  from 'react';
import _ from 'lodash';

import {
  Row,
  Col
} from 'react-bootstrap';

import './Recipe.css';

const propTypes = {
  recipes: PropTypes.array.isRequired,

  cartActions: PropTypes.object.isRequired
};

const defaultTypes = {
  recipes: []
};

export default function Recipe(props) {
  const { recipes } = props;

  let recipe = _.find(recipes, { recipe_id: parseInt(props.params.id, 10) });
  let instructions = _.split(recipe.instructions, '\r\n\r\n');

  const getRecipeImage = () => {
    return(
      <img 
        src={ process.env.PUBLIC_URL + '/img/' + recipe.image_name } 
        alt={ recipe.image_name.split('.')[0] }
      />
    )
  };

  const getInstructions = () => {
    return instructions.map((instruction, index) => {
      return <li key={ index }>{ instruction }</li>;
    });
  };

  const handleAddToCart = () => {
    props.cartActions.addRecipe(recipe);
  };

  const getIngredients = () => {
    const { ingredients } = recipe;

    return ingredients.map((ingredient, index) => {
      const ingredientUnit = ingredient.unit;
      let ingredientQuantity = ingredient.quantity;

      if (ingredientUnit.length > 0) {
        ingredientQuantity = ingredientQuantity.toFixed(2);
      }

      if (ingredientQuantity === 0) {
        return(
          <li key={ ingredient.display_index }>
            { ingredient.name }
          </li>
        )
      }

      return (
        <li key={ ingredient.display_index }>
          { 
            ingredient.name + ' _ ' + 
            ingredientQuantity + ' ' +
            ingredient.unit
          }
        </li>
      );
    });
  };

  const getRecipeInformations = () => {
    return(
      <div className="Recipe-Informations-Texts">
        <h1>{ recipe.title }</h1>
        <h2>Ingredients</h2>
        <ul className="Recipe-Ingredients">
          { getIngredients() }
        </ul>
        <button 
          className="Recipe-Cart"
          onClick={ handleAddToCart }
        >
          ADD TO CART
        </button>
      </div>
    )
  };

  return (
    <div className="Recipe">
      <Row>
        <Col xs={7} sm={7} md={7} lg={7} 
          className="Recipe-Informations" 
        >
          { getRecipeInformations() }
        </Col>
        <Col xs={5} sm={5} md={5} lg={5}>
          { getRecipeImage() }
        </Col>
      </Row>
      <Row className="Recipe-Instructions">
        <h1>Instructions</h1>
        <ol>
          { getInstructions() }
        </ol>
      </Row>
    </div>
  );
}

Recipe.defaultTypes = defaultTypes;
Recipe.propTypes = propTypes;