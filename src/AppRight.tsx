import React, { useState } from 'react';
import { Title } from './style';
import { ItemWrapper as Wrapper } from './components/helpers/ItemWrapper';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { StoreState } from './store/store';
import { CountryReducer } from './reducers';
import { Table } from './Table';
import { LineGraph, CasesType } from './LineGraph';
import { sortedCountries } from './utils/util';

const AppRightWrapper = styled.div`
	background: #fff;
	flex: 0.3;
`;

const FormWrapper = styled(Wrapper)`
	align-items: center;
`;

const Label = styled.label``;

const RadioInput = styled.input`
	display: inline-block;
	margin-right: 0.35rem;
`;

export const AppRight: React.FC = (): JSX.Element => {
	const [casesType, setCasesType] = useState<CasesType>(CasesType['cases']);

	const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setCasesType(e.target.value as CasesType);
	};

	const countriesState = useSelector(
		(state: StoreState): CountryReducer => state.countriesState
	);

	const countriesData = countriesState.countries;

	const sortedCountriesData = sortedCountries(countriesData);

	return (
		<AppRightWrapper>
			{/* Table */}
			<Title>Live Cases by Country</Title>
			<Table countriesData={sortedCountriesData} />
			{/* Graph */}
			<Title>Worldwide new cases</Title>
			<LineGraph casesType={CasesType[casesType]} />
			<FormWrapper flexDirection='row' justifyContent='center'>
				<Label htmlFor='cases'>cases</Label>
				<RadioInput
					id='cases'
					name='casesType'
					type='radio'
					onChange={onChange}
					value='cases'
					checked={CasesType[casesType] === 'cases' ? true : false}
				/>
				<Label htmlFor='deaths'>deaths</Label>
				<RadioInput
					id='deaths'
					type='radio'
					name='casesType'
					value='deaths'
					onChange={onChange}
					checked={CasesType[casesType] === 'deaths' ? true : false}
				/>
			</FormWrapper>
		</AppRightWrapper>
	);
};
