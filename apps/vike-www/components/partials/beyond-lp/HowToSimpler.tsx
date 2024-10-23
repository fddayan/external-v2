import * as React from "react";
import { Flex } from "@src/components/Boxes";
import styled from "@emotion/styled";
import Container from "@src/components/Container";
import { mediaQueries } from "@src/styles/theme";
import { Button } from "@src/components/nessie-web";
import { TranslationContext } from "@src/components/translation/TranslationContext";
import Translate from "@src/components/translation/Translate";
import { theme, BodyText, Title } from "@src/components/nessie-web";
import FooterBg from "@src/assets/images/beyond-lp/footer-bg.svg";
import Planet from "@src/assets/images/beyondschool/beyond-school-bottom-homeplanet.svg";
import MojoAstronaut from "@src/assets/images/beyond-lp/mojo-astronaut.svg";

const InfoBox = styled(Flex)`
  position: relative;
  max-width: none;
  background: #fff;
  margin-bottom: 20px;
  margin-left: 0;
  ${mediaQueries[0]} {
    margin-left: 40px;
    align-items: center;
  }
`;
InfoBox.defaultProps = {
  flexDirection: "column",
  alignItems: ["center", "center", "start"],
};

const FooterArea = styled("div")`
  padding-bottom: 40px;
  background-image: url(${FooterBg});
  background-size: cover;
  background-position: center top;
  background-repeat: no-repeat;
  overflow: hidden;
`;

const FooterBox = styled(Flex)`
  border-radius: 20px;
  border: solid 2px ${theme.colors.taro30};
  position: relative;
  background: white;
  &:before {
    display: block;
    content: url(${MojoAstronaut});
    position: absolute;
    transform: scale(0.6);
    top: -120px;
    left: -20px;
    ${mediaQueries[1]} {
      left: -200px;
      top: 20px;
      transform: scale(1);
    }
  }
  &:after {
    display: block;
    content: url(${Planet});
    position: absolute;
    transform: scale(0.6);
    top: -160px;
    right: -20px;
    ${mediaQueries[1]} {
      right: -200px;
      top: -70px;
      transform: scale(1);
    }
  }
`;

const HowToSection = () => {
  const t = React.useContext(TranslationContext);
  return (
    <div>
      <FooterArea>
        <Container paddingY={100}>
          <FooterBox
            textAlign="center"
            paddingX={100}
            paddingY={50}
            padding={["100px 50px 50px 50px", "50px 100px"]}
            width={["100%", "75%", "75%"]}
            margin="auto"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight={300}
          >
            <Title>
              <Translate path="directus.page_home_reward.final_title" />
            </Title>
            <br />
            <BodyText>
              <Translate path="directus.page_home_reward.final_text" />
            </BodyText>
            <br />
            <Button kind="primary" href={t.translate("directus.page_home_points.final_button_url")}>
              <Translate path="directus.page_home_points.final_button_label" />
            </Button>
          </FooterBox>
        </Container>
      </FooterArea>
    </div>
  );
};

export default HowToSection;
