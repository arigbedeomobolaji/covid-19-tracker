import React from 'react';
import styled from 'styled-components';
import { CasesType } from './LineGraph';
import { prettyPrintStat } from './utils/showDataOnMap';

interface Props {
	title?: string;
	cases?: number;
	total?: number;
	fontSize?: string;
	color?: string;
	onClick?: () => void;
	casesType?: CasesType;
	active?: boolean;
	isGreen?: boolean;
}

const Card = styled.div`
	cursor: pointer;
	box-shadow: 2px 2px 5px
		${({ casesType }: Props) =>
			casesType && CasesType[casesType] === 'recovered'
				? '#cae8aa7f'
				: '#e6a5b17f'};
	border-radius: 5px;
	border-top: ${({ active }: Props) => active && '10px solid'};
	background: #fff;
	padding: 1rem;
	flex: 1 1 230px;
	border-top-color: ${({ casesType }: Props) =>
		casesType && CasesType[casesType] === 'recovered'
			? '#7dd71d'
			: '#cc1034'};

	&:not(:last-child) {
		margin-right: 10px;
	}

	@media (max-width: 500px) {
		margin: 0.5rem;
		padding: 0.5rem;
	}
`;

const CardContent = styled.div`
	padding: 5px;
`;

const Title = styled.h1`
	font-size: ${({ fontSize }: Props) =>
		fontSize ? `${fontSize}rem` : '1rem'};
	color: ${({ color }) => (color ? color : '#000')};
	padding-bottom: 0.5rem;

	@media (max-width: 500px) {
		font-size: 0.95rem;
		font-weight: bold;
	}
`;

const SubTitle = styled.h2`
	padding-bottom: 0.5rem;
	color: ${({ isGreen }: Props) => (isGreen ? '#7dd71d' : '#cc1034')};

	@media (max-width: 500px) {
		font-size: 1rem;
		font-weight: bold;
	}
`;

export const InfoBox: React.FC<Props> = ({
	title,
	cases,
	total,
	onClick,
	casesType,
	active,
	isGreen,
}): JSX.Element => {
	return (
		<Card onClick={onClick} casesType={casesType} active={active}>
			<CardContent>
				<Title color='#666' fontSize='1.12'>
					{title}
				</Title>
				<SubTitle isGreen={isGreen}>
					{cases ? `+${prettyPrintStat(cases)}` : 'No Data'}
				</SubTitle>
				<Title color='#666'>
					{total ? `+${prettyPrintStat(total)} Total` : 'No Data'}
				</Title>
			</CardContent>
		</Card>
	);
};
