import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { cartActionCreators } from '../../modules/index';

import Cart from './Cart';

const mapStateToProps = state => {
  const { 
    numberOfRecipesByRecipe,
    ingredientsByDepartment,
    numberOfItemsInCart
  } = state.cart;

  const { recipes } = state.store;

  return {
    numberOfRecipesByRecipe,
    ingredientsByDepartment,
    numberOfItemsInCart,

    recipes
  }
};

const mapDispatchToProps = dispatch => {
  return { 
    cartActions: bindActionCreators(cartActionCreators, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);