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
			setData(chartData);
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
								backgroundColor: 'rgba(233, 42, 77, 0.1)',
								borderColor: '#CC1034',
								fill: true,
								fillColor: 'rgba(220,220,220,0.2)',
								strokeColor: 'rgba(220,220,220,1)',
								pointColor: 'rgba(220,220,220,1)',
								pointStrokeColor: '#fff',
								pointHighlightFill: '#fff',
								pointHighlightStroke: 'rgba(220,220,220,1)',
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
