import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { cartActionCreators } from '../../modules/index';

import Recipe from './Recipe';

const mapStateToProps = state => {
  const { recipes } = state.store;

  return {
    recipes
  }
};

const mapDispatchToProps = dispatch => {
  return { 
    cartActions: bindActionCreators(cartActionCreators, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Recipe);