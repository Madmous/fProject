import React, { PropTypes } from 'react';
import { Row } from 'react-bootstrap';

import { 
  RecipeItem, 
  PageTitle 
} from '../../components/index';

import './Home.css';

const propTypes = {
  recipes: PropTypes.array.isRequired
};

const defaultTypes = {
  recipes: []
};

export default function Home(props) {
  const renderRecipes = () => {
    const { recipes } = props;

    return recipes.map(recipe => {
      return (
        <RecipeItem 
          key={recipe.recipe_id}
          imageName={recipe.image_name}
          recipeId={recipe.recipe_id}
        />
      )
    })
  }

  return (
    <div className="Home">
      <PageTitle title="Recipes"/>
      <Row className="Recipes-Grid">
        { renderRecipes() }
      </Row>
    </div>
  );
}

Home.defaultTypes = defaultTypes;
Home.propTypes = propTypes;