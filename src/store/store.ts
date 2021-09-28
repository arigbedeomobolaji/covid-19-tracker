import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { countriesReducer, CountryReducer } from '../reducers';

export interface StoreState {
	countriesState: CountryReducer;
}

declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
	}
}

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
	countriesState: countriesReducer,
});

const store = createStore(reducers, composeEnhancer(applyMiddleware(thunk)));

export default store;
