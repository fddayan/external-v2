import s from "@emotion/styled";
import Container from "@src/components/Container";
import GatsbyImageWrapper from "@src/components/GatsbyImageWrapper";
import { Link } from "gatsby";

export const Background = s("div")`
padding: 24px;
`;

export const StyledContainer = s(Container)`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
background-color: #EBF2FF;
border-radius: 32px;
padding: 36px;
margin: auto;
gap: 24px;
`;

export const Logo = s(GatsbyImageWrapper)`
  max-width: 450px;
  width: 100%;
`;

export const StyledLink = s(Link)`
background-color: #6835D6;
border-radius: 50px;
color: white;
padding: 16px 24px;
font-family: DojoDisplay,"Helvetica Neue",Helvetica,Arial,sans-serif;
font-weight: 700;
`;
