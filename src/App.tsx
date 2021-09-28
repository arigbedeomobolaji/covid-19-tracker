import React from 'react';
import { GlobalStyle } from './style';
import { AppLeft } from './AppLeft';
import { AppRight } from './AppRight';
import { ItemWrapper as Wrapper } from './components/helpers/ItemWrapper';
import styled from 'styled-components';

const AppWrapper = styled(Wrapper)`
	justify-content: space-evenly;

	@media (max-width: 990px) {
		flex-direction: column;
	}
`;

export const App: React.FC = () => {
	return (
		<>
			<GlobalStyle />
			<AppWrapper>
				<AppLeft className='app__left' />
				<AppRight />
			</AppWrapper>
		</>
	);
};
