import styled, { createGlobalStyle } from 'styled-components';
export const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: #f3efef;
}

#root {
  font-family: 'Open Sans', sans-serif;
}
`;

export const Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 10px 5px 20px;

	@media (max-width: 500px) {
		margin: 0;
	}
`;

export const Title = styled.h1`
	font-size: 1.5rem;
	font-family: cursive;
	padding: 0.75rem;
	text-align: center;

	@media (max-width: 500px) {
		font-size: 0.95rem;
		font-weight: bold;
	}
`;

export const Select = styled.select`
	color: #000;
	background: #f9f9f9;
	padding: 0.5rem;
	outline: none;
	border: 1px solid #ccc;
	border-radius: 5px;
	width: 20vw;
	font-weight: bold;

	@media (max-width: 500px) {
		width: 40vw;
	}
`;
