import { ActionTypes, Country, Action } from '../actions';

export interface CountryReducer {
	countries: Country[];
}

const countriesDataDefault = {
	countries: [],
};

export const countriesReducer = (
	state: CountryReducer = countriesDataDefault,
	action: Action
): CountryReducer => {
	switch (action.type) {
		case ActionTypes.fetchCountries:
			return {
				countries: action.payload,
			};
		default:
			return state;
	}
};
