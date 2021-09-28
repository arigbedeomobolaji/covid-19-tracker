import React from 'react';
import styled from 'styled-components';
import { Country } from './actions';

interface Props {
	countriesData: Country[];
}

const TableContainer = styled.div`
	margin: 16px 0;
	overflow-y: scroll;
	height: 400px;
`;

const TableElement = styled.table`
	color: #6a5d5d;
	border-collapse: collapse;
	width: 100%;
`;

const TableRow = styled.tr`
	display: flex;
	justify-content: space-between;
	padding: 0 1rem;
	&:nth-of-type(odd) {
		background: #f3f2f8;
	}
`;

const TableBody = styled.tbody`
	overflow: scroll;
	height: 400px;
`;

const TableData = styled.td`
	padding: 0.35rem;
`;

export const Table: React.FC<Props> = (props): JSX.Element => {
	return (
		<TableContainer>
			<TableElement>
				<TableBody>
					{props.countriesData.map(
						({ country, cases }: Country): JSX.Element => (
							<TableRow key={country}>
								<TableData>{country}</TableData>
								<TableData>
									<strong>{cases}</strong>
								</TableData>
							</TableRow>
						)
					)}
				</TableBody>
			</TableElement>
		</TableContainer>
	);
};
