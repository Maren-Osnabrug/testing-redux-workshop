import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { todos, visibilityFilter } from './ducks';

const rootReducer = combineReducers({
	todos,
	visibilityFilter,
});

export default createStore(rootReducer, applyMiddleware(thunkMiddleware));
