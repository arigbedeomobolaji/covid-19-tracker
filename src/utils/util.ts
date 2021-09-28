import { Country } from '../actions';

export const sortedCountries = (arr: Country[]): Country[] =>
	arr.sort((a: Country, b: Country): number => b.cases - a.cases);
