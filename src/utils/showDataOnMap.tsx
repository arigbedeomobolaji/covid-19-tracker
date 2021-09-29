import { Circle, Popup } from 'react-leaflet';
import numeral from 'numeral';
import styled from 'styled-components';
import { CasesType } from '../LineGraph';
import { Country } from '../actions';
import { ItemWrapper as Wrapper } from '../components/helpers/ItemWrapper';

type CasesTypeColor = {
	hex: string;
	multipier: number;
};

type CasesTypeColors = {
	cases: CasesTypeColor;
	recovered: CasesTypeColor;
	deaths: CasesTypeColor;
};

const casesTypeColors: CasesTypeColors = {
	cases: {
		hex: '#CC1034',
		multipier: 800,
	},
	recovered: {
		hex: '#7dd71d',
		multipier: 1200,
	},
	deaths: {
		hex: '#fb4443',
		multipier: 2000,
	},
};

const PopupWrapper = styled(Wrapper)`
	color: #5a5a5a;
	text-align: right;
	font-family: 'open sans', sans-serif;
`;

const WrapperImage = styled.img`
	height: 40px;
	width: 50%;
	margin: auto;
`;

const CountryName = styled.h2`
	font-size: 1.2rem;
	color: #333;
`;

const CountryDataElement = styled.h4`
	font-size: 1.1rem;
`;

export const showDataOnMap = (
	data: Country[],
	casesType: CasesType = CasesType['cases']
) => {
	return data.map((country) => (
		<Circle
			key={country.country}
			center={[country.countryInfo.lat, country.countryInfo.long]}
			fillOpacity={0.1}
			color={casesTypeColors[casesType].hex}
			fillColor={casesTypeColors[casesType].hex}
			radius={Math.sqrt(
				country[casesType] *
					casesTypeColors[casesType].multipier *
					Math.sqrt(casesTypeColors[casesType].multipier / 300)
			)}
		>
			<Popup>
				<PopupWrapper flexDirection='column'>
					<WrapperImage
						src={`${country.countryInfo.flag}`}
						alt={`${country.country}`}
					/>
					<CountryName>{country.country}</CountryName>
					<CountryDataElement>
						<strong>
							Cases: {numeral(country.cases).format('0,0')}
						</strong>
					</CountryDataElement>
					<CountryDataElement>
						<strong>
							Recovered:{' '}
							{numeral(country.recovered).format('0,0')}
						</strong>
					</CountryDataElement>
					<CountryDataElement>
						{' '}
						<strong>
							Deaths: {numeral(country.deaths).format('0,0')}
						</strong>
					</CountryDataElement>
				</PopupWrapper>
			</Popup>
		</Circle>
	));
};

export const prettyPrintStat = (stat: number): string =>
	stat ? `${numeral(stat).format('0.0a')}` : '0';
