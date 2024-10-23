import { Button } from "@src/components/new-nessie";
import styled from "@emotion/styled";
import { mediaQueriesMax } from "@src/styles/theme";

export const Oversized = styled.h2`
  text-align: center;
  font-feature-settings: "clig" off, "liga" off;
  font-family: DojoDisplay !important;
  font-size: 92px;
  font-style: normal;
  font-weight: 800;
  line-height: 90%;
  letter-spacing: -0.12px;

  ${mediaQueriesMax[1]} {
    font-size: 44px;
    line-height: 120%;
    letter-spacing: -0.3px;
  }
`;

export const Headline1 = styled.h2`
  color: var(--Black, #2c2a50);
  text-align: center;
  font-feature-settings: "clig" off, "liga" off;
  font-family: DojoDisplay !important;
  font-size: 69px;
  font-style: normal;
  font-weight: 800;
  line-height: 110%; /* 75.9px */
  letter-spacing: -0.9px;

  ${mediaQueriesMax[1]} {
    font-size: 35px;
    font-style: normal;
    font-weight: 800;
    line-height: 120%; /* 42px */
    letter-spacing: -0.3px;
  }
`;

export const Subheading = styled.p`
  color: var(--Taro-60, #5d5d8f);
  text-align: center;
  font-feature-settings: "clig" off, "liga" off;
  font-family: "DojoText";
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: 120%; /* 33.6px */
  letter-spacing: -0.1px;

  ${mediaQueriesMax[1]} {
    font-size: 18px;
  }
`;
export const Headline2 = styled.h2`
  color: var(--Black, #2c2a50);
  text-align: center;
  font-feature-settings: "clig" off, "liga" off;
  font-family: DojoDisplay !important;
  font-size: 69px;
  font-style: normal;
  font-weight: 800;
  line-height: 110%; /* 75.9px */
  letter-spacing: -0.9px;
  padding: 0px;
  margin: 0px;
`;
export const SubHeadline = styled.p`
  color: var(--Taro-60, #5d5d8f);
  text-align: center;
  font-feature-settings: "clig" off, "liga" off;
  font-family: DojoText;
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: 120%; /* 33.6px */
  letter-spacing: -0.1px;
`;
export const ButtonStyled = styled(Button)`
  background-color: #2c2a50;
`;
export const VStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
export const HStack = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
`;
export const Paragraph = styled.p`
  color: var(--Taro-60, #5d5d8f);
  font-feature-settings: "clig" off, "liga" off;
  /* Marketing/Body/Body 1 */
  font-family: "DojoText";
  font-size: 21px;
  font-style: normal;
  font-weight: 500;
  line-height: 130%; /* 27.3px */
`;
export const Link = styled.a`
  color: var(--Light-Content-Primary, #2c2a50);
  font-feature-settings: "clig" off, "liga" off;
  font-family: "DojoText";
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 23px; /* 127.778% */
  text-decoration-line: underline;
`;
export const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;
export const Left = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
`;
