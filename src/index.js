import { 
  browserHistory, 
  IndexRoute, 
  Router, 
  Route 
} from 'react-router';

import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import React from 'react';

import configureStore from './store/configureStore';

import App from './app/AppContainer';

import {
  Recipe,
  Home,
  Cart
} from './app/routes/index';

import './index.css';

console.log(browserHistory)

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="cart" component={Cart} />
        <Route path="recipes/:id" component={Recipe} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);