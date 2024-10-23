import s from "@emotion/styled";
import Container from "@src/components/Container";
import { mediaQueries } from "@src/styles/theme";

export const Background = s("div")`
  background-color: #EBF2FF;
  padding-inline: 24px;
  h2, p {
    color: #0B2E47 !important;
    text-align: center;
  }
  ${mediaQueries[1]} {
    background-image: url("https://static.classdojo.com/uploads/53d09b38-17eb-48c2-9370-2b1d10ab1ff9.png"), url("https://static.classdojo.com/uploads/d15c4ddf-b0e0-4cac-8f51-05c8794b3619.png");
    background-repeat: no-repeat, no-repeat;
    background-position: 102% 5%,5% 60%;
  }
`;

export const SectionContainer = s(Container)`
  display: grid;
  gap: 24px;
  justify-items: center;
  padding: 60px 0;
`;

export const Activities = s("div")`
  display: flex;
  gap: 24px;
  flex-direction: column;
  margin: 24px 0;
  width: 100%;
  ${mediaQueries[0]} {
    flex-direction: row;
  }
`;

export const ActivityCard = s("div")`
  height: 440px;
  width: 100%;
  align-self: strech;
  border-radius: 24px;
  padding: 32px 42px;
  position: relative;
  background: #0B2E47;
  background-size: cover;
  background-position: top;
  &:nth-of-type(1) {
    transform: rotate(1.5deg);
    display: none;
  }
  &:nth-of-type(2) {
    transform: rotate(-1.5deg);
    top: 12px;
  }
  &:nth-of-type(3) {
    transform: rotate(1.5deg);
    top: -12px;
    display: none;
  }
  ${mediaQueries[2]} {
    max-width: 340px;
    height: 440px;
    display: block !important;
  }
`;

export const Features = s("div")`
  display: flex;
  gap: 24px;
  flex-direction: column;
  margin: 24px 0;
  ${mediaQueries[0]} {
    flex-direction: row;
    justify-content: space-around;
  }
`;

export const Feature = s("div")`
  display: grid;
  justify-items: center;
  &:not(:nth-of-type(last)) {
    border-bottom: solid 4px #add2ff;
  }
  ${mediaQueries[1]} {
    width: 30%;
    min-width: 360px;
  }
`;

export const Divider = s("div")`
  background-color: #ADD2FF;
  border-radius: 2px;
  height: 4px;
  width: auto;
  opacity: 0.2;

  ${mediaQueries[0]} {
    width: 4px;
    height: auto;
  }
`;
