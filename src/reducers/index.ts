import { ActionTypes, Country, Action, FetchCasesTypeAction } from '../actions';
import { CasesType } from '../LineGraph';

export interface CountryReducer {
	countries: Country[];
}

export interface CasesTypeReducer {
	casesType: CasesType;
}

const countriesDataDefault = {
	countries: [],
};

const casesTypeDefault = {
	casesType: CasesType.cases,
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

export const casesTypeReducer = (
	state: CasesTypeReducer = casesTypeDefault,
	action: FetchCasesTypeAction
): CasesTypeReducer => {
	switch (action.type) {
		case ActionTypes.fetchCasesType:
			return {
				casesType: CasesType[action.payload],
			};
		default:
			return state;
	}
};
