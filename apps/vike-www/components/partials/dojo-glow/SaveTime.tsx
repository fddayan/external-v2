import React from "react";
import { Typography } from "../../Typography";
import { useDojoGlow } from "./context";
import { Flex } from "@src/components/Boxes";
import { GImage } from "@src/components/GImage";
import { css } from "@emotion/react";
import { buildEventLog, ButtonPrimary, Headline } from "./styles";
import { mediaQueriesMax } from "@src/styles/theme";
import { MainContainer } from "./page";
import styled from "@emotion/styled";

const desktopImageStyle = {
  width: "100%",
  transform: "translateX(-140px) translateY(-140px)",
  display: "block",
  [mediaQueriesMax[1]]: {
    display: "none",
    transform: "translateX(0) translateY(0)",
  },
};

const mobileImageStyle = {
  width: "100%",
  transform: "translateX(-140px) translateY(-140px)",
  display: "none",
  [mediaQueriesMax[1]]: {
    display: "block",
    transform: "translateX(0) translateY(0)",
  },
};

const HiddenDiv = styled.div`
  overflow: hidden;
  padding-top: 100px;
  ${mediaQueriesMax[1]} {
    padding-top: 60px;
  }
`;

export const SaveTime = () => {
  const { saveTime: values } = useDojoGlow();
  return (
    <HiddenDiv>
      <MainContainer>
        <Flex flexDirection={["column", "column", "row"]} gap={30}>
          <Flex flexDirection="column" flex={2} gap={[12, 24, 24]} minWidth={["auto", 400]}>
            <Typography
              variant={["minutia", "Headline3Bold", "Headline3Bold"]}
              css={css({ textTransform: "uppercase", fontWeight: "bold" })}
            >
              {values.sub_title}
            </Typography>
            <Headline variant={["Display5ExtraBold", "Display2ExtraBold", "Display2ExtraBold"]}>
              {values.title}
            </Headline>
            <Typography variant={["Body2", "Body1", "Body1"]}>{values.text}</Typography>
            <Flex>
              <ButtonPrimary
                variant="primary"
                href="https://www.classdojo.com/ul/t/school?target=story"
                eventLog={buildEventLog("save_time.button")}
              >
                {values.button_text}
              </ButtonPrimary>
            </Flex>
          </Flex>
          <GImage img={values.image} alt="" css={desktopImageStyle} />
          <GImage img={values.imageMobile} alt="" css={mobileImageStyle} />
        </Flex>
      </MainContainer>
    </HiddenDiv>
  );
};
