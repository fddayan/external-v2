import { Flex } from "@src/components/Boxes";
import { GImage } from "@src/components/GImage";
import { Typography } from "@src/components/Typography";
import React from "react";
import { useDojoGlow } from "./context";
import { buildEventLog, ButtonPrimary, Headline } from "./styles";
import { mediaQueriesMax } from "@src/styles/theme";
import { MainContainer } from "./page";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

const HiddenDiv = styled.div`
  overflow: hidden;
  padding-top: 100px;
  ${mediaQueriesMax[1]} {
    padding-top: 60px;
  }
`;

const imageStyle = {
  width: 200,
  marginLeft: -45,
  [mediaQueriesMax[1]]: {
    width: 45,
    marginLeft: 0,
  },
};

const SignUps = () => {
  const { signUps: values } = useDojoGlow();
  return (
    <HiddenDiv>
      <MainContainer>
        <Flex flexDirection={["column", "column", "row"]} gap={30}>
          <Flex flexDirection="column" flex={2} gap={[12, 24, 24]} minWidth={["auto", 370]}>
            <GImage img={values.image_a} alt="" css={imageStyle} />
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
                href="https://www.classdojo.com/ul/t/school?target=createEvent"
                eventLog={buildEventLog("sign_ups.button")}
              >
                {values.button_text}
              </ButtonPrimary>
            </Flex>
          </Flex>
          <GImage img={values.image_b} alt="" css={{ maxWidth: 660 }} />
        </Flex>
      </MainContainer>
    </HiddenDiv>
  );
};

export default SignUps;
