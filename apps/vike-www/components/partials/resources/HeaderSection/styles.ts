import styled from "@emotion/styled";
import { theme, Title } from "@src/components/nessie-web";
import HeroBackgroundImage from "@src/assets/images/resources/header2.jpg";
import HeroCurve from "@src/assets/images/resources/header-curve.svg";

export const Header = styled("div")`
  background-image: url(${HeroCurve}), url(${HeroBackgroundImage});
  background-repeat: no-repeat, no-repeat;
  background-position: center 101%, center center;
  background-size: contain, cover;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: start;
`;

export const HeroTitle = styled(Title)`
  max-width: 750px;
`;

export const Navmenu = styled("nav")`
  ul {
    display: flex;
    list-style: none;
    flex-direction: row;
    margin: 0;
    padding: 0;
    gap: ${theme.space.s}px ${theme.space.dt_l}px;
    padding: 16px 0;
    flex-wrap: wrap;
  }
`;
