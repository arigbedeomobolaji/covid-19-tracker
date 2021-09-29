import { Dispatch } from 'redux';
import { CasesType } from '../LineGraph';
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

export interface FetchCasesTypeAction {
	type: ActionTypes.fetchCasesType;
	payload: CasesType;
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

export const fetchCaseTypeAction = (
	casesType: CasesType
): FetchCasesTypeAction => {
	if (CasesType[casesType] === 'cases') {
		return {
			type: ActionTypes.fetchCasesType,
			payload: CasesType[casesType],
		};
	} else if (CasesType[casesType] === 'recovered') {
		return {
			type: ActionTypes.fetchCasesType,
			payload: CasesType[casesType],
		};
	} else {
		return {
			type: ActionTypes.fetchCasesType,
			payload: CasesType[casesType],
		};
	}
};

export * from './types';
