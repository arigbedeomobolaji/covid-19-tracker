import { FormControl } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Header, Select, Title } from './style';
import { InfoBox } from './InfoBox';
import { ItemWrapper as Wrapper } from './components/helpers/ItemWrapper';
import { Map } from './Map';
import { fetchCountriesAction } from './actions';
import { StoreState } from './store/store';
import { CountryReducer } from './reducers';
import 'leaflet/dist/leaflet.css';

interface CountryInfo {
	name?: string;
	value: string;
}

interface DiseaseStat {
	countryInfo?: {
		flag?: string;
		iso2?: string;
		iso3?: string;
		lat?: number;
		long?: number;
	};
	cases?: number;
	todayCases?: number;
	deaths?: number;
	todayDeaths?: number;
	recovered?: number;
	todayRecovered?: number;
}

const AppLeftWrapper = styled.div`
	flex: 0.7;
	width: 100%;
`;

const HeaderTitle = styled(Title)`
	color: #cc1034;
	font-weight: bold;
	font-size: 2rem;

	@media (max-width: 750px) {
		font-size: 1.5rem;
	}

	@media (max-width: 500px) {
		font-size: 1rem;
	}
`;

const InfoBoxWrapper = styled(Wrapper)`
	@media (max-width: 500px) {
		flex-wrap: wrap;
	}
`;

interface Props {
	className?: string;
}

export const AppLeft: React.FC<Props> = (): JSX.Element => {
	const dispatch = useDispatch();
	const countriesDataState: CountryReducer = useSelector(
		(state: StoreState): CountryReducer => state.countriesState
	);

	const { countries = [] } = countriesDataState;
	const [countriesList, setCountriesList] = useState<CountryInfo[]>([]);
	const [country, setCountry] = useState<string>('worldwide');
	const [diseaseStat, setDiseaseStat] = useState<DiseaseStat>({});
	const [mapCenter, setMapCenter] = useState<[number, number]>([
		34.80746, -40.4796,
	]);
	const [mapZoom, setMapZoom] = useState(3);

	const fetchDiseaseStats = async (url: string): Promise<{}> => {
		const response = await fetch(url);
		const data: DiseaseStat = await response.json();
		return data;
	};

	const onCountryChange = async (
		e: React.ChangeEvent<HTMLSelectElement>
	): Promise<void> => {
		const countryCode = e.target.value;
		const url =
			countryCode === 'worldwide'
				? 'https://disease.sh/v3/covid-19/all'
				: `https://disease.sh/v3/covid-19/countries/${countryCode}`;
		const data: DiseaseStat = await fetchDiseaseStats(url);
		if (data.cases) {
			setCountry(countryCode);
			setDiseaseStat(data);
			if (data.countryInfo) {
				data.countryInfo.lat &&
					data.countryInfo.long &&
					setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
				setMapZoom(15);
			}
		}
	};

	useEffect(() => {
		const getDiseaseStat = async function () {
			const data: DiseaseStat = await fetchDiseaseStats(
				'https://disease.sh/v3/covid-19/all'
			);
			if (data.cases) {
				setDiseaseStat(data);
			}
		};
		getDiseaseStat();
	}, []);

	useEffect(() => {
		if (countries.length === 0) dispatch(fetchCountriesAction());
		if (countries.length) {
			const listCountries: CountryInfo[] = countries.map(
				(country: {
					country: string;
					countryInfo: { is02: string };
				}): CountryInfo => {
					return {
						name: country.country,
						value: country.countryInfo.is02,
					};
				}
			);

			setCountriesList(listCountries);
		}
	}, [dispatch, countries]);

	return (
		<AppLeftWrapper>
			<Header>
				<HeaderTitle>Covid 19 TRACKER</HeaderTitle>
				<FormControl>
					<Select value={country} onChange={onCountryChange}>
						<option value='worldwide'>Worldwide</option>
						{countriesList.length &&
							countriesList.map((country) => (
								<option
									key={country.name}
									value={country.value}
								>
									{country.name}
								</option>
							))}
					</Select>
				</FormControl>
			</Header>

			<InfoBoxWrapper>
				<InfoBox
					title='Cases'
					cases={diseaseStat.todayCases}
					total={diseaseStat.cases}
					onClick={(): void => console.log('cases')}
				/>
				<InfoBox
					title='Recovered'
					cases={diseaseStat.todayRecovered}
					total={diseaseStat.recovered}
					onClick={(): void => console.log('recovered')}
				/>
				<InfoBox
					title='Deaths'
					cases={diseaseStat.todayDeaths}
					total={diseaseStat.deaths}
					onClick={(): void => console.log('deaths')}
				/>
			</InfoBoxWrapper>
			<Map center={mapCenter} zoom={mapZoom} countries={countries} />
		</AppLeftWrapper>
	);
};

// console.log(bcrypt.compareSync(password, user.password))
// or
// const isPasswordCorrect = await bcrypt.compare(password, user.password))
// console.log(isPasswordCorrect)
