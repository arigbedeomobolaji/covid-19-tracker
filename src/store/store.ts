import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import {
	countriesReducer,
	CountryReducer,
	CasesTypeReducer,
	casesTypeReducer,
} from '../reducers';

export interface StoreState {
	countriesState: CountryReducer;
	casesTypeState: CasesTypeReducer;
}

declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
	}
}

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
	countriesState: countriesReducer,
	casesTypeState: casesTypeReducer,
});

const store = createStore(reducers, composeEnhancer(applyMiddleware(thunk)));

export default store;
