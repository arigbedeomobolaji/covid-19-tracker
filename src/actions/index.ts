import { Dispatch } from 'redux';
import { ActionTypes } from './types';

export interface Country {
	country: string;
	countryInfo: {
		flag: string;
		is02: string;
		lat: number;
		long: number;
	};
	cases: number;
	recovered: number;
	deaths: number;
}

export interface FetchCountriesAction {
	type: ActionTypes.fetchCountries;
	payload: Country[];
}

export const fetchCountriesAction = () => {
	return async (dispatch: Dispatch) => {
		const response = await fetch(
			'https://disease.sh/v3/covid-19/countries'
		);
		const data: Country[] = await response.json();
		dispatch<FetchCountriesAction>({
			type: ActionTypes.fetchCountries,
			payload: data,
		});
	};
};

export * from './types';
