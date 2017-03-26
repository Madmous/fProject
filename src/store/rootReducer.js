import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { 
	store,
	cart
} from '../app/modules/index';

const rootReducer = combineReducers({
	store,
	cart,

	routing: routerReducer
})

export default rootReducer;