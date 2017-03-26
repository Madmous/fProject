import { connect } from 'react-redux';

import RecipeItem from './RecipeItem';

const mapStateToProps = state => {
  const { recipes } = state.store;

  return {
    recipes
  }
};

export default connect(mapStateToProps, null)(RecipeItem);