import { FetchCountriesAction, FetchCasesTypeAction } from './';
export enum ActionTypes {
	fetchCountries,
	fetchCasesType,
}

export type Action = FetchCountriesAction;
export type CasesTypeAction = FetchCasesTypeAction;
