import s from "@emotion/styled";
import Container from "@src/components/Container";
import GatsbyImageWrapper from "@src/components/GatsbyImageWrapper";
import { mediaQueries } from "@src/styles/theme";
import { Link } from "gatsby";

export const Background = s("div")`
  background-color: #EBF2FF;
  border-top: 1px solid #CCE3FF;
  border-bottom: 1px solid #CCE3FF;
  position: relative;
  display: flex;
  align-items: center;
  z-index: 9;
`;

export const StyledContainer = s(Container)`
  text-align: center;
  padding-top: 32px;
  padding-bottom: 48px;
  h2 {
    color: #0B2E47;
  }
`;

export const ActivitiesContainer = s("div")`
  display: grid;
  grid-template-columns: 150px 150px;
  gap: 20px;
  margin: 20px auto;
  width: fit-content;
  ${mediaQueries[1]} {
    display: flex;
    gap: 40px;
    justify-content: center;
    margin: 32px auto;
  }
`;

export const Activity = s(Link)`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  h3 {
    margin: 0;
    font-size: 16px;
    text-wrap: balance;
  }
  &:nth-of-type(1) .gatsby-image-wrapper,
  &:nth-of-type(3) .gatsby-image-wrapper {
    transform: rotate(-1.5deg);
  }
  &:nth-of-type(2) .gatsby-image-wrapper,
  &:nth-of-type(4) .gatsby-image-wrapper {
    transform: rotate(1.5deg);
  }
  ${mediaQueries[1]} {
    width: 280px;
    h3 {
      font-size: 24px;
    }
  }
`;

export const ActivityImage = s(GatsbyImageWrapper)`
  height: 150px;
  width:150px;
  border-radius: 18px;
  ${mediaQueries[1]} {
    height: 280px;
    width: 280px;
    border-radius: 32px;
  }
`;

export const ActivityTags = s("div")`
  display: flex;
  flex-wrap: wrap;
  align-items: start;
  justify-content: center;
  gap: 0 4px;
  font-size: 12px;
  color: #1A192D;
  opacity: 0.66;
  span:not(:first-of-type)::before {
    content: "•";
    margin-right: 4px;
  }
  ${mediaQueries[1]} {
    font-size: 20px
  }
`;

export const StyledButton = s(Link)`
  display: flex;
  justify-content: center;
  gap: 12px;
  align-items: center;
  height: 64px;
  border-radius: 32px;
  padding: 12px 28px;
  font-size: 20px;
  line-height: 1.3;
  font-weight: 600;
  width: 100%;
  font-family: DojoDisplay,"Helvetica Neue",Helvetica,Arial,sans-serif;
  background-color: #6835D6;
  border: none;
  color: white;
  :hover {
    background-color: #462699;
  }
  ${mediaQueries[1]} {
    width: fit-content;
    margin: auto;
  }
`;
