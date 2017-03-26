import React, { PropTypes } from 'react';

import {
  Row,
  Col
} from 'react-bootstrap';

import _ from 'lodash';

import { PageTitle } from '../../components/index';

import './Cart.css';

const propTypes = {
  numberOfRecipesByRecipe: PropTypes.object.isRequired,
  ingredientsByDepartment: PropTypes.object.isRequired,
  numberOfItemsInCart: PropTypes.number.isRequired,
  recipes: PropTypes.array.isRequired,

  cartActions: PropTypes.object.isRequired
};

const defaultTypes = {
  numberOfRecipesByRecipe: {},
  ingredientsByDepartment: {},
  numberOfItemsInCart: 0,
  recipes: []
};

export default function Cart(props) {
  const getIngredients = () => {
    const { ingredientsByDepartment } = props;

    let ingredientContent = [];

    _.forOwn(ingredientsByDepartment, function(ingredients, key) {
      const allIngredients = ingredients.map((ingredient, index) => {
        const ingredientUnit = ingredient.unit;
        let ingredientQuantity = ingredient.quantity;

        if (ingredientUnit.length > 0) {
          ingredientQuantity = ingredientQuantity.toFixed(2);
        }

        if (ingredientQuantity === 0) {
          return(
            <li key={ index }>
              { ingredient.name }
            </li>
          )
        }

        return (
          <li key={ index }>
            { 
              ingredient.name + ' _ ' + 
              ingredientQuantity + ' ' +
              ingredient.unit
            }
          </li>
        );
      });

      ingredientContent.push(
        <div className="Cart-Ingredients" key={ ingredientContent.length }>
          <h5>{ key }</h5>
          <ul>
            { allIngredients }
          </ul>
        </div>
      );
    });

    return ingredientContent;
  };

  const handleOnClick = (canUpdate, recipe) => {
    if (canUpdate) {
      props.cartActions.addRecipe(recipe);
    } else {
      props.cartActions.removeRecipe(recipe);
    }
  };

  const getCartContent = () => {
    const { numberOfItemsInCart } = props;

    if (numberOfItemsInCart === 0) {
      return (
        <Row className="Cart-Empty">
          <Col xs={12} sm={12} md={12} lg={12}>
            <h3>It Appears That Your Cart Is Currently Empty!</h3>
            <h5>Please Continue Shopping ...</h5>
          </Col>
        </Row>
      )
    }

    const getContent = () => {
      const { 
        numberOfRecipesByRecipe, 
        recipes 
      } = props;

      let cartContent = [];

      _.forOwn(numberOfRecipesByRecipe, function(value, key) {
          let recipe = _.find(recipes, { recipe_id: parseInt(key, 10) });

          cartContent.push (
            <Row key={ recipe.recipe_id }>
              <Col xs={12} sm={5} md={4} lg={4} className="Cart-Image">
                <img 
                  src={ process.env.PUBLIC_URL + '/img/' + recipe.image_name } 
                  alt={ recipe.image_name.split('.')[0] }
                />
              </Col>
              <Col xs={12} sm={7} md={8} lg={8} className="Cart-Description">
                <strong className="Cart-Description-Title">{ recipe.title }</strong>
                <Row className="Cart-Description-ValueSelect">
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <span>
                      <span className="Cart-Description-Quantity">Quantity: { value }</span>
                    </span>
                  </Col>
                </Row>
                <Row className="Cart-Description-UpdateDelete">
                  <Col xs={12} sm={6} md={6} lg={6}>
                    <button 
                      onClick={ () => handleOnClick(true, recipe) }
                      className="Cart-Description-Update"
                    >
                      Add
                    </button>
                  </Col>
                  <Col xs={12} sm={6} md={6} lg={6}>
                    <button 
                      onClick={ () => handleOnClick(false, recipe) }
                      className="Cart-Description-Delete"
                    >
                      Remove
                    </button>
                  </Col>
                </Row>
              </Col>
            </Row>
          );
      });

      return cartContent;
    }

    return (
      <Row className="Cart-Not-Empty">
        <Col xs={12} sm={7} md={8} lg={9} className="Cart-Products">
          { getContent() }
        </Col>
        <Col xs={12} sm={5} md={4} lg={3}className="Cart-Total">
          { getIngredients() }
        </Col>
      </Row>
    )
  };

  return (
    <div className="Cart">
      <PageTitle title="Shopping cart" />
      { getCartContent() }
    </div>
  );
}

Cart.defaultTypes = defaultTypes;
Cart.propTypes = propTypes;