import { connect } from 'react-redux';

import Home from './Home';

const mapStateToProps = state => {
  const { recipes } = state.store;

  return {
    recipes
  }
};

export default connect(mapStateToProps, null)(Home);