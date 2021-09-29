import React from 'react';
import { Title } from './style';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { StoreState } from './store/store';
import { CountryReducer, CasesTypeReducer } from './reducers';
import { Table } from './Table';
import { LineGraph, CasesType } from './LineGraph';
import { sortedCountries } from './utils/util';

const AppRightWrapper = styled.div`
	background: #fff;
	flex: 0.3;
`;

export const AppRight: React.FC = (): JSX.Element => {
	const countriesState = useSelector(
		(state: StoreState): CountryReducer => state.countriesState
	);

	const countriesData = countriesState.countries;

	const sortedCountriesData = sortedCountries(countriesData);

	const casesTypeState: CasesTypeReducer = useSelector(
		(state: StoreState): CasesTypeReducer => state.casesTypeState
	);
	const { casesType } = casesTypeState;

	return (
		<AppRightWrapper>
			{/* Table */}
			<Title>Live Cases by Country</Title>
			<Table countriesData={sortedCountriesData} />
			{/* Graph */}
			<Title>Worldwide new cases</Title>
			<LineGraph casesType={CasesType[casesType]} />
		</AppRightWrapper>
	);
};
