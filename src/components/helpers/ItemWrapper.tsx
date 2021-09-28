import React from 'react';
import styled from 'styled-components';

interface Props {
	display?: string;
	flexDirection?: string;
	justifyContent?: string;
	margin?: string;
	padding?: string;
}

const Wrapper = styled.div`
	display: flex;
	flex-direction: ${({ flexDirection }: Props) =>
		flexDirection ? flexDirection : 'row'};
	justify-content: ${({ justifyContent }: Props) =>
		justifyContent ? justifyContent : 'space-between'};
	margin: ${({ margin }: Props) => (margin ? `${margin}rem` : '0.4rem')};
	padding: ${({ padding }: Props) => (padding ? `${padding}rem` : '1rem')};

	@media (max-width: 500px) {
		margin: 0;
	}
`;

export const ItemWrapper: React.FC<Props> = (props) => {
	return <Wrapper {...props}>{props.children}</Wrapper>;
};
