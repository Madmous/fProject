import { 
  applyMiddleware, 
  createStore,
  compose 
} from 'redux'; 

import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import createLogger from 'redux-logger';

import rootReducer from './rootReducer'

const logger = createLogger();
const middleware = routerMiddleware(browserHistory)

export default function configureStoreProd(preloadedState) {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  return createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(applyMiddleware(middleware, logger))
  )
}