import React from 'react';
import styled from 'styled-components';
import { LatLngTuple } from 'leaflet';
import { MapContainer, TileLayer } from 'react-leaflet';
import { showDataOnMap } from './utils/showDataOnMap';
import { Country } from './actions';
import { CasesType } from './LineGraph';

interface Props {
	center: LatLngTuple;
	zoom: number;
	countries: Country[];
	casesType: CasesType;
}

const url: string = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const attribution: string =
	'&copy; <a href="http://osm.org/copyright> OpenStreetMap </a> contributors';

const MapWrapper = styled.div`
	height: 600px;
	width: 80%;
	margin: 0 auto;
	padding: 1rem 0;

	.leaflet-container {
		height: 100%;
		width: 100%;
		display: block;
	}
`;

export const Map: React.FC<Props> = ({
	center,
	zoom,
	countries,
	casesType,
}): JSX.Element => {
	return (
		<MapWrapper>
			<MapContainer center={center} zoom={3} zoomControl={true}>
				<TileLayer attribution={attribution} url={url} />
				{showDataOnMap(countries, casesType)}
			</MapContainer>
		</MapWrapper>
	);
};
