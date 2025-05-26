import styled from 'styled-components';

export const Box = styled.div`
// padding: 30px 0px 30px 0px;  
// padding: 30px;
background-color: #4B3049;
position: absolute;
width: 100%;
// bottom: 0;
z-index: -1;

@media (max-width: 1000px) {
	// padding: 70px 30px;
	// padding: 30px;
}
`;

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	max-width:100%;
	// padding-left: 44px;
	// padding-right: 44px;
	padding: 20px 44px 20px 44px
	// margin: 0 auto;
	/* background: red; */
`

export const Column = styled.div`
display: flex;
flex-direction: column;
text-align: left;
// margin-left: 60px;
`;

export const Row = styled.div`
display: grid;
// grid-template-columns: repeat(auto-fill,
// 						minmax(185px, 1fr));  
grid-template-columns: repeat(auto-fill,
						minmax(220px, 1fr)); 						
grid-gap: 20px;

@media (max-width: 1000px) {
	grid-template-columns: repeat(auto-fill,
						minmax(200px, 1fr));
}
`;

export const FooterLink = styled.a`
color: #fff;
margin-bottom: 20px;
font-size: 18px;
text-decoration: none;

&:hover {
	// color: green;
	transition: 200ms ease-in;
}
`;

export const Heading = styled.p`
font-size: 22px;
color: #fff;
// margin-bottom: 10px;
font-weight: bold;
`;
