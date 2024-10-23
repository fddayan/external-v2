import styled from "@emotion/styled";
import { mediaQueries } from "@src/styles/theme";
import HeroBackgroundImage from "@src/assets/images/resources/new-footer.jpg";
import HeroCurve from "@src/assets/images/resources/footer-curve.svg";

export const Header = styled("div")`
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    riht: 0;
  }
  background-image: url(${HeroCurve}), linear-gradient(0deg, rgba(44, 42, 80, 0.5), rgba(44, 42, 80, 0.5)),
    url(${HeroBackgroundImage});
  background-repeat: no-repeat, no-repeat, no-repeat;
  background-position: top center, center center, center center;
  min-height: 500px;
  background-size: 200% 107px, cover, cover;
  ${mediaQueries[1]} {
    background-size: 100% 107px, cover, cover;
    min-height: 701px;
  }
  display: flex;
  align-items: center;
  justify-content: start;
`;

export const FooterContent = styled("div")`
  text-align: center;
`;

export const FooterButtonHolder = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
`;
