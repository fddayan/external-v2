import * as React from "react";
import { Box, Flex } from "@src/components/Boxes";
import Container from "@src/components/Container";
import { useStaticQuery, graphql } from "gatsby";
import { Title, Subheading, DeprecatedDetailText } from "@src/components/nessie-web";
import Button from "@src/components/Button";
import { useContext } from "react";
import { TranslationContext } from "@src/components/translation/TranslationContext";
import GatsbyImageWrapper from "@src/components/GatsbyImageWrapper";

const HeroSection = () => {
  const data = useStaticQuery(graphql`
    {
      directus {
        page_schoolleader2 {
          hero_image {
            filename_disk
          }
        }
      }
    }
  `);
  const t = useContext(TranslationContext);
  const {
    directus: {
      page_schoolleader2: { hero_image },
    },
  } = data;

  return (
    <Container>
      <Flex flexDirection={["column-reverse", "row"]} alignItems="center" marginTop="36px" marginBottom="36px">
        <Box width={["100%", "50%"]}>
          <Title size={2}>{t.translate("directus.page_schoolleader2.title")}</Title>
          <br />
          <Subheading>{t.translate("directus.page_schoolleader2.subtitle")}</Subheading>
          <Box width={["100%", "75%"]} marginTop="36px" textAlign="center">
            <Button
              width="100%"
              marginBottom="12px"
              as="a"
              big
              href="https://calendly.com/classdojo-support/school-leader-1-1-schoolwide-support?month=2023-02"
            >
              {t.translate("directus.page_schoolleader2.button_text")}
            </Button>
            <br />
            <DeprecatedDetailText>{t.translate("directus.page_schoolleader2.detail_text")}</DeprecatedDetailText>
          </Box>
        </Box>
        <Box width={["100%", "50%"]} marginLeft={["0", "20px"]}>
          <div>
            <GatsbyImageWrapper image={hero_image} alt="Year review card" />
          </div>
        </Box>
      </Flex>

      <Flex flexDirection={["column", "row"]} marginBottom="36px">
        <Box width={["100%", "33%"]}>
          <blockquote className="twitter-tweet">
            <p lang="en" dir="ltr">
              Principals- if you aren’t on <a href="https://twitter.com/ClassDojo?ref_src=twsrc%5Etfw">@ClassDojo</a>{" "}
              communicating with parents and school members- get on there! We have 1500+ parents connected on DoJo. It’s
              easy to use and our parents are comfortable contacting us on there. We’ve pushed out virtual Meet the
              Teacher, announcements, etc.
            </p>
            &mdash; Dr. Chuck Yeager (@YeagerChuck){" "}
            <a href="https://twitter.com/YeagerChuck/status/1299151419342286850?ref_src=twsrc%5Etfw">August 28, 2020</a>
          </blockquote>
        </Box>
        <Box width={["100%", "33%"]} margin={["0 18px"]}>
          <blockquote className="twitter-tweet" data-conversation="none">
            <p lang="en" dir="ltr">
              I’ve always had great relationships with my parents and I think communication is the key tool as it makes
              them feel you are approachable. We use{" "}
              <a href="https://twitter.com/ClassDojo?ref_src=twsrc%5Etfw">@ClassDojo</a> and the Class Story lets them
              feel included in what happens in the classroom ☺️
            </p>
            &mdash; Mr E (@MrETeachs){" "}
            <a href="https://twitter.com/MrETeachs/status/1298401696230539265?ref_src=twsrc%5Etfw">August 25, 2020</a>
          </blockquote>
        </Box>
        <Box width={["100%", "33%"]}>
          <blockquote className="twitter-tweet">
            <p lang="en" dir="ltr">
              Thank you ClassDojo for providing a seamless transition into remote learning. Student and parent friendly
              allows sharing lesson, events and immediate feedback. Can’t wait to use new features.{" "}
              <a href="https://twitter.com/FieldsFalcons?ref_src=twsrc%5Etfw">@FieldsFalcons</a> @FieldsInspires{" "}
              <a href="https://twitter.com/hashtag/WeAreReady?src=hash&amp;ref_src=twsrc%5Etfw">#WeAreReady</a>{" "}
              <a href="https://twitter.com/hashtag/WeGotThis?src=hash&amp;ref_src=twsrc%5Etfw">#WeGotThis</a>
            </p>
            &mdash; Rosie Flores (@roflores1234){" "}
            <a href="https://twitter.com/roflores1234/status/1294141448275673089?ref_src=twsrc%5Etfw">
              August 14, 2020
            </a>
          </blockquote>
        </Box>
      </Flex>
    </Container>
  );
};

export default HeroSection;
