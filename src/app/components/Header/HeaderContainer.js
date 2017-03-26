import { connect } from 'react-redux';

import Header from './Header';

const mapStateToProps = state => {
  const { numberOfItemsInCart } = state.cart;

  return {
    numberOfItemsInCart
  }
};

export default connect(mapStateToProps, null)(Header);