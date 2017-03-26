import { connect } from 'react-redux';

import App from './App';

const mapStateToProps = state => {
  const { numberOfItemsInCart } = state.cart;
  const { recipes } = state.store;

  return {
    numberOfItemsInCart,
    recipes
  }
}

export default connect(mapStateToProps, null)(App);