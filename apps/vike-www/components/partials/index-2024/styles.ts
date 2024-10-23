import styled from "@emotion/styled";
import { mediaQueriesMax } from "@src/styles/theme";
import { Button } from "@src/components/nessie-web";

// linear-gradient(180deg, #D1EBFF 20.12%, #9A7CFF 67.46%, #6B34E2 100%);

export const HeroContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 64px;
  position: relative;
  &.hero-a {
    height: 900px;
    background-image: url(https://static.classdojo.com/uploads/15b25e71-5430-4cfc-9cd2-05e53c78394e.jpg);
    background-size: cover;
    background-position: "center";
    padding-bottom: 100px;
    ${mediaQueriesMax[1]} {
      background-size: cover;
      background-image: url(https://static.classdojo.com/uploads/dd9fab9e-b7ed-47d4-8608-211a10d77abc.jpg);
      background-position: center;
      height: 500px;
    }
  }
  &.hero-b {
    background-image: linear-gradient(180deg, #d1ebff 20.12%, #9a7cff 67.46%, #6b34e2 100%);
  }
`;

// export const HeroContainer = styled.div`
//   height: 900px;
//   display: flex;
//   align-items: center;
//   flex-direction: column;
//   background-image: url(https://static.classdojo.com/uploads/15b25e71-5430-4cfc-9cd2-05e53c78394e.jpg);
//   background-size: cover;
//   background-position: "center";
//   padding-top: 64px;
//   position: "relative";
//   padding-bottom: 100px;
//   padding-inline: 24px;
//   ${mediaQueriesMax[1]} {
//     background-size: cover;
//     background-image: url(https://static.classdojo.com/uploads/dd9fab9e-b7ed-47d4-8608-211a10d77abc.jpg);
//     background-position: top;
//     height: 500px;
//   }
// `;

export const HeroHeadline = styled("div")`
  color: var(--Light-Content-Primary, #2c2a50);
  text-align: center;
  font-feature-settings: "clig" off, "liga" off;
  font-family: "DojoDisplay" !important;
  font-feature-settings: "ss04" on;
  font-size: 78px;
  font-style: normal;
  font-weight: 800;
  line-height: 110%; /* 85.8px */
  letter-spacing: -0.9px;
  ${mediaQueriesMax[1]} {
    font-size: 38px;
    line-height: 90%;
  }
`;

export const HeroSubHeadline = styled("h3")`
  color: var(--Light-Content-Primary, #2c2a50);
  text-align: center;
  font-feature-settings: "clig" off, "liga" off;
  font-family: "DojoText";
  font-size: 24px;
  font-style: normal;
  font-weight: 800;
  line-height: 120%; /* 28.8px */
  letter-spacing: -0.1px;
  margin: 0;
  ${mediaQueriesMax[1]} {
    font-size: 18px;
    font-weight: 700;
  }
`;

export const HeroButton = styled.button`
  display: block;
  background-color: rgba(44, 42, 80, 1);
  color: white;
  font-family: "DojoText";
  font-size: "18px";
  font-style: "normal";
  font-weight: 700;
  line-height: "23px";
  padding: 18;
  border-radius: 100;
  border: 0;
`;

export const HeroRatingContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  align-items: center;
  background-image: url(https://static.classdojo.com/uploads/80cfd76f-5c8e-483f-bbad-98b7003326c2.svg),
    url(https://static.classdojo.com/uploads/8674fed8-e3dd-401e-a7ba-87091f2703c9.svg),
    url(https://static.classdojo.com/uploads/64a7d689-db5a-4efc-bd5c-5d3e5bf5a7be.svg),
    url(https://static.classdojo.com/uploads/7eba13f5-0b60-45b7-86f9-c0afed280fe0.svg);
  background-position: calc(50% + 300px) 120px, calc(50% + 500px) 40px, calc(50% - 200px) 40px, calc(50% - 400px) 80px;
  background-repeat: no-repeat;
  margin-top: -200px;
  margin-bottom: 60px;
  ${mediaQueriesMax[1]} {
    background-image: none;
    margin-top: 0;
    margin-inline: 30px;
    .illustration {
      display: none;
    }
  }
`;

export const Headline3 = styled.h3`
  color: var(--Light-Content-Primary, #2c2a50);
  font-feature-settings: "clig" off, "liga" off;
  font-family: "DojoText";
  font-size: 23px;
  font-style: normal;
  font-weight: 800;
  line-height: 120%; /* 27.6px */
  letter-spacing: -0.1px;
  margin: 0;
`;

export const Headline1 = styled.h2`
  color: var(--Black, #2c2a50);
  text-align: center;
  font-feature-settings: "clig" off, "liga" off;
  font-family: "DojoDisplay" !important;
  font-feature-settings: "ss04" on;
  font-size: 69px;
  font-style: normal;
  font-weight: 800;
  line-height: 110%; /* 75.9px */
  letter-spacing: -0.9px;
  margin: 0;
  ${mediaQueriesMax[1]} {
    font-size: 35px;
  }
`;
export const Headline2 = styled.h2`
  color: var(--Black, #2c2a50);
  text-align: center;
  font-feature-settings: "clig" off, "liga" off;
  font-family: "DojoDisplay" !important;
  font-feature-settings: "ss04" on;
  font-size: 69px;
  font-style: normal;
  font-weight: 800;
  line-height: 110%; /* 75.9px */
  letter-spacing: -0.9px;
  padding: 0px;
  margin: 0px;
  text-align: left;
`;

export const ButtonsPanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  ${mediaQueriesMax[1]} {
    align-items: center;
    gap: 10px;
  }
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
  ${mediaQueriesMax[1]} {
    font-size: 18px;
  }
`;
export const ButtonStyled = styled(Button)`
  background-color: #2c2a50;
`;
export const VStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

interface HStackProps {
  responsive?: boolean;
}

export const HStack = styled.div<HStackProps>`
  display: flex;
  flex-direction: row;
  gap: 12px;
  ${mediaQueriesMax[1]} {
    flex-direction: ${(props) => (props.responsive ? "column" : "row")};
  }
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
  ${mediaQueriesMax[1]} {
    font-size: 18px;
  }
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
`;

export const Left = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
`;

export const BlackButton = styled(Button)`
  background-color: #2c2a50;
  &:hover {
    background-color: #1a192d;
  }
`;

export const SecondaryButton = styled(Button)`
  background-color: #fff;
`;

export const LinkButton = styled(Button)`
  background-color: #6835d6;
  &:hover {
    background-color: #462699;
  }
`;
