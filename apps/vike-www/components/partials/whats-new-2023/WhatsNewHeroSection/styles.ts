import s from "@emotion/styled";
import Container from "@src/components/Container";
import { mediaQueries } from "@src/styles/theme";
import { GatsbyImage } from "gatsby-plugin-image";

type BackgroundProps = {
  image: string[];
};

export const Background = s("div")<BackgroundProps>`
  background-image: url("https://static.classdojo.com/uploads/526dc8d1-1cfd-48af-bea4-fb8e95775a7e.png"), url("https://static.classdojo.com/uploads/85067e3d-57e7-4e2a-9132-8a25e0111e0a.png"), url("https://static.classdojo.com/uploads/c537480c-165c-413c-a3d5-69f0d78b9fd9.png"), url("https://static.classdojo.com/uploads/dffc0782-5f3a-420d-880f-52b8a7d8883d.png");
  background-position: 100% 0%, -5% 100%, 110% 100%, -5% 0%;
  background-size: auto;
  background-repeat: no-repeat;
  ${mediaQueries[0]} {
    background-position: center;
    background-image: url("${(p) => p.image[1]}");
  }
`;

export const HeroContainer = s(Container)`
  position: relative;
  text-align: center;
  padding-bottom: 110px;
  margin-bottom: 80px;
  padding-inline: 24px;
  & > h1 {
    margin-bottom: 16px !important;
    max-width: 460px;
    margin: auto;
  }
  & > p {
    margin-bottom: 24px !important;
    max-width: 400px;
    margin: auto;
  }
`;

export const HeroImage = s("img")`
  max-width: 440px;
  margin: auto;
`;

export const VideoChip = s("button")`
  display: flex;
  gap: 12px;
  align-items: center;
  height: 64px;
  width: fit-content;
  padding: 12px;
  margin: auto;
  border-radius: 16px;
  background-color:#F1F3F8;
  border: 0;
  cursor: pointer;
  :hover {
    background-color: #E2E4F0;
  }
  img {
    height: 42px;
    border-radius: 8px;
  }
  p {
    margin-bottom: 0;
  }
`;
