import s from "@emotion/styled";
import Container from "@src/components/Container";
import { theme } from "@src/components/nessie-web";
import { mediaQueries } from "@src/styles/theme";
import { GatsbyImage } from "gatsby-plugin-image";

export const Background = s("div")`
  background-color: ${theme.colors.taro20};
`;

export const PageContainer = s(Container)`
  font-family: DojoText, "Helvetica Neue", Helvetica, Arial, sans-serif;
  padding: 24px;
  h1 {
    font-size: 40px;
    font-weight: 900;
    line-height: 1.3;
    margin-bottom: 18px;
  }
  p, li {
    font-size: 20px;
    line-height: 1.7;
    margin-bottom: 18px;
    em {
      font-weight: 700;
      color: ${theme.colors.grape50};
    }
  }
  li {
    margin-bottom: 0;
  }
  ${mediaQueries[0]} {
    background-color: transparent;
    display: grid;
    grid-gap: 36px;
    grid-template-columns: auto 350px;
    padding: 72px 24px;
  }
`;

export const TextSection = s("div")`
`;

export const CalendarSection = s("div")`
  text-align: center;
  button {
    margin: auto;
  }
`;

export const Quote = s("div")`
  display: flex;
  gap: 16px;
  padding: 0 20px;
  text-align: left;
`;

export const QuoteAvatar = s(GatsbyImage)`
  height: 62px;
  min-width: 62px;
  border-radius: 99px;
`;

export const QuoteText = s("span")`
  background-color: white;
  padding: 8px 18px;
  border-radius: 24px;
  border-top-left-radius: 0;
`;

export const CalendarIframe = s("iframe")`
  height: 420px;
  margin: 24px 0;
  border: 0;
  border-radius: 24px;
`;
