import React from "react";
import { Typography } from "../../Typography";
import { GImage } from "../../GImage";
import { useDojoGlow } from "./context";
import { Flex } from "@src/components/Boxes";
import styled from "@emotion/styled";
// import { Button } from "@src/components/nessie-web";
import { buildEventLog, ButtonPrimary } from "./styles";
import { GQLImage } from "@src/components/whats-new-sl/context";
import { css } from "@emotion/react";
import theme from "@src/styles/theme-v2";
import islandsLogo from "@src/assets/images/dojo-islands/dojo-islands-logo.svg";
import { mediaQueriesMax } from "@src/styles/theme";

const Banner = styled(Flex)`
  border-radius: var(--sp-24, 24px);
  background-color: ${theme.colors.ocean10};
  padding: ${(props) => props.theme.__new.spacing[60]};
  position: relative;
  gap: ${theme.spacing[60]};
  color: ${theme.colors.contentPrimary};
  ${mediaQueriesMax[1]} {
    .islands-logo {
      width: 120px;
    }
    padding: ${theme.spacing[24]};
    gap: ${theme.spacing[24]};
  }
`;

interface CardProps {
  title: string;
  image: GQLImage;
}

const CardStyled = styled(Flex)`
  border-radius: 14.276px;
  background: #fff;
  box-shadow: 0px 2px 0px 0px rgba(45, 64, 150, 0.06);
  overflow: hidden;
  flex-grow: 1;
`;

const CardTypography = styled("div")`
  overflow: hidden;
  color: var(--Content-Primary, #1a192d);
  font-feature-settings: "liga" off;
  text-overflow: ellipsis;
  font-family: Grandstander;
  font-size: 13.681px;
  font-style: normal;
  font-weight: 800;
  line-height: 16.655px; /* 121.739% */
  letter-spacing: -0.068px;
  text-transform: uppercase;
`;

const FooterText = styled("div")`
  color: var(--Content-Tertiary, #8689b8);
  font-feature-settings: "clig" off, "liga" off;
  font-family: "DojoText";
  font-size: 8px;
  font-style: normal;
  // font-weight: 500;
  line-height: 8.922px; /* 125% */
  letter-spacing: 0.119px;
`;

const cardButtonStyle = css`
  height: 10px;
  width: 73px;
  span {
    font-size: 9px;
  }
`;

const cube1Styles = {
  position: "absolute",
  width: 268,
  height: 268,
  top: -150,
  left: 0,
  zIndex: 100,
  [mediaQueriesMax[1]]: {
    // width: 80,
    // top: -120
    display: "none",
  },
};

const cube2Styles = {
  position: "absolute",
  width: 191,
  height: 191,
  top: "50%",
  right: -100,
  zIndex: 100,
  [mediaQueriesMax[1]]: {
    // width: 70,
    // right: 0,
    display: "none",
  },
};

const cube3Styles = {
  position: "absolute",
  width: 299,
  height: 299,
  bottom: -150,
  left: 0,
  zIndex: 100,
  [mediaQueriesMax[1]]: {
    // width: 70,
    // right: 0,
    display: "none",
  },
};
const Card = (props: CardProps) => {
  return (
    <CardStyled flexDirection="column">
      <GImage img={props.image} alt="" />
      <Flex p={10}>
        <Typography variant="overline" css={{ textTransform: "uppercase" }}>
          {props.title}
        </Typography>
      </Flex>
      <Flex flexDirection="row" p={10} alignItems="flex-end" justifyContent="flex-end">
        <Flex flex={1}>
          <img src="https://static.classdojo.com/uploads/a3160f42-5299-4aec-9a2a-e052e8e4c830.png" alt="" />
        </Flex>
      </Flex>
    </CardStyled>
  );
};

export const DojoIslands = () => {
  const { dojoIslands: values } = useDojoGlow();
  return (
    <Banner flexDirection="column" alignItems="center" css={{ textAlign: "center" }}>
      <GImage img={values.cube_1} alt="" css={cube1Styles} />
      <GImage img={values.cube_2} alt="" css={cube2Styles} />
      <GImage img={values.cube_3} alt="" css={cube3Styles} />
      <div
        css={{ display: "flex", flexDirection: "column", alignItems: "center", maxWidth: 700, gap: theme.spacing[18] }}
      >
        <img src={islandsLogo} alt="" width={270} className="islands-logo" />
        <Typography variant={["Display5ExtraBold", "Display3ExtraBold"]}>{values.title_a}</Typography>
        <Typography variant={["Body3", "Headline2Medium"]}>{values.text_a}</Typography>
        <ButtonPrimary
          variant="primary"
          href="https://www.classdojo.com/ul/t/class?target=dojoIslandsTab"
          target="_blank"
          eventLog={buildEventLog("dojo_island.cta_primary")}
        >
          {values.cta_primary_text}
        </ButtonPrimary>
      </div>
      <video
        autoPlay
        playsInline
        loop
        muted
        css={{ width: "100%", height: "auto", borderRadius: 24 }}
        src="https://static.classdojo.com/img/2024/07/gameplay-dojo-islands.mp4"
      />
      <Flex flexDirection={["column", "column", "row"]} alignItems="center" gap={24}>
        <Flex flexDirection="column" textAlign={["center", "left", "left"]} gap={12}>
          <Typography variant={["Display5ExtraBold", "Display3ExtraBold"]}>{values.title_b}</Typography>
          <Typography variant={["minutia", "Body1"]}>{values.text_b}</Typography>
        </Flex>
        <GImage img={values.image_b} alt="" />
      </Flex>
      <Flex flexDirection="column" gap={24} width={"100%"} textAlign={["center", "left"]}>
        <Typography variant={["Display5ExtraBold", "Display3ExtraBold"]}>{values.title_c}</Typography>
        <Flex flexDirection={["column", "row"]} justifyContent="space-between" gap={24} css={{ width: "100%" }}>
          <Card title="SUPER FOOD" image={values.image_c_1} />
          <Card title="BOARD GAME" image={values.image_c_2} />
          <Card title="FRIENDSHIP CASTLE" image={values.image_c_3} />
        </Flex>
      </Flex>
      <Flex alignItems="center" justifyContent="center" my={20}>
        <ButtonPrimary
          variant="primary"
          css={{ alignSelf: "center" }}
          href="https://www.classdojo.com/ul/t/class?target=dojoIslandsTab"
          eventLog={buildEventLog("dojo_island.cta_secondary")}
        >
          {values.cta_secondary_text}
        </ButtonPrimary>
      </Flex>
    </Banner>
  );
};
