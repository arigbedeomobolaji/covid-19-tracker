// @ts-nocheck

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Line } from 'react-chartjs-2';
import { options } from './utils/lineGraphOptions';

export enum CasesType {
	cases = 'cases',
	recovered = 'recovered',
	deaths = 'deaths',
}

interface Props {
	casesType: CasesType;
}

type Data = {
	cases: { [key: string]: number };
	recovered: { [key: string]: number };
	deaths: { [key: string]: number };
};

type ChartData = {
	x: string;
	y: number;
};

const LineWrapper = styled.div`
	min-height: 400px;
`;

const buildChartData = (
	data: Data,
	casesType: CasesType = CasesType.cases
): ChartData[] => {
	let chartData: ChartData[] = [];
	let lastDataPoint;
	for (let date in data[casesType]) {
		if (lastDataPoint) {
			let newDataPoint = {
				x: date,
				y: data[casesType][date] - lastDataPoint,
			};
			chartData.push(newDataPoint);
		}
		lastDataPoint = data[casesType][date];
	}
	return chartData;
};

export const LineGraph: React.FC<Props> = ({ casesType }) => {
	const [data, setData] = useState<ChartData[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			const result = await fetch(
				'https://disease.sh/v3/covid-19/historical/all?lastdays=120'
			);
			const data: Data = await result.json();
			let chartData = buildChartData(data, casesType);
			if (casesType === 'recovered') {
				setData(chartData.slice(0, chartData.length - 3));
			} else {
				setData(chartData);
			}
		};
		fetchData();
	}, [casesType]);

	return (
		<LineWrapper>
			{data?.length > 0 && (
				<Line
					data={{
						datasets: [
							{
								label: casesType,
								backgroundColor: `${
									casesType === 'recovered'
										? '#cae8aa7f'
										: '#e6a5b17f'
								}`,
								borderColor: `${
									casesType === 'recovered'
										? '#7dd71d'
										: '#CC1034'
								}`,
								fill: true,
								fillColor: `${
									casesType === 'recovered'
										? '#cae8aa7f'
										: '#e6a5b17f'
								}`,
								strokeColor: 'rgba(220,50,50,1)',
								pointColor: 'rgba(50,50,220,1)',
								pointStrokeColor: '#6f5f4f',
								pointHighlightFill: '#4f5f6f',
								pointHighlightStroke: 'rgba(220,100,100,1)',
								data: data,
							},
						],
					}}
					options={options}
				/>
			)}
		</LineWrapper>
	);
};
