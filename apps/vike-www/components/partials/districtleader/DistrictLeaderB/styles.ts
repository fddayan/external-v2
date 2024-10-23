import s from "@emotion/styled";
import Container from "@src/components/Container";
import { theme } from "@src/components/nessie-web";
import { mediaQueries } from "@src/styles/theme";

export const PageContainer = s(Container)`
  font-family: DojoText, "Helvetica Neue", Helvetica, Arial, sans-serif;
  padding: 48px 24px;
  text-align: center;
  h1 {
    font-size: 48px;
    font-weight: 900;
    line-height: 1.33;
    margin-bottom: 32px;
  }
  p {
    font-size: 16px;
    line-height: 1.7;
    strong {
      font-size: 24px;
      font-weight: 800;
      margin-bottom: 32px;
    }
    em {
      font-weight: 700;
      font-style: normal;
    }
  }
`;

export const Features = s("div")`
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 16px;
  ${mediaQueries[0]} {
    grid-template-columns: repeat(4, minmax(auto, 320px));
    justify-items: center;
    margin-bottom: 32px;
  }
`;

export const Feature = s("div")`
`;

export const CtaBlock = s("div")`
  background-color: ${theme.colors.grape20};
  border-radius: 24px;
  padding: 24px 16px;
  text-align: left;
  margin: 32px 0;
  ${mediaQueries[0]} {
    padding: 24px;
    display: grid;
    grid-gap: 18px;
    grid-template-columns: auto 240px;
    p {
      grid-column-start: 1;
      margin-bottom: 0;
    }
    button {
      align-self: center;
      grid-row: 1 / 3;
      grid-column-start: 2;
    }
  }
`;

export const CaptchaContainer = s("div")`
  margin-top: 80px;
  height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  [class*="TextField"] {
    input {
      text-align: center;
    }
  }
`;

export const CalendarIframe = s("iframe")`
  width: 100%;
  height: calc(100vh - 100px);
  margin: 24px 0;
  border: 0;
  border-radius: 24px;
`;
