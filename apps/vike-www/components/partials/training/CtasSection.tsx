import React from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import { Flex, Box } from "@src/components/Boxes";
import { ChevronRightIcon } from "@classdojo/web/nessie/icons";
import { theme, Subheading, DeprecatedDetailText, ListItem } from "@src/components/nessie-web";
import Container from "@src/components/Container";

const CtaContainer = ({ children, url }) => (
  <Flex
    backgroundColor={theme.colors.white}
    alignItems="center"
    padding="24px"
    border={`2px solid ${theme.colors.taro30}`}
    borderRadius="42px"
    boxShadow={`0 6px 0 ${theme.colors.taro20}`}
    flexBasis={["70%", "49%"]}
    margin="12px 0"
    textAlign="left"
  >
    <a href={url}>{children}</a>
  </Flex>
);

const CtaImg = ({ img, ...otherProps }) => (
  <Box marginRight="12px">
    <GatsbyImage image={img} {...otherProps} />
  </Box>
);

const CtaTitle = ({ children }) => (
  <Box marginBottom="12px">
    <Subheading textAlign="left">{children}</Subheading>
  </Box>
);

const CtaDescription = ({ children }) => <DeprecatedDetailText>{children}</DeprecatedDetailText>;

const CtaButton = () => (
  <ChevronRightIcon size="m" color="taro90" _dangerouslyDisableNessiePropTypes _dangerouslyAllowCustomColors />
);

const CtasSection = ({ data }) => {
  const { content, images } = data;
  return (
    <Box padding={["30px 0", "60px 0"]} textAlign="center" backgroundColor={theme.colors.taro10}>
      <Container>
        <Flex flexDirection={["column", "row", "row"]} justifyContent="space-between" flexWrap="wrap">
          {content.map((c, i) => {
            return (
              <CtaContainer url={c.url} key={i}>
                <ListItem
                  title={<CtaTitle>{c.title}</CtaTitle>}
                  description={<CtaDescription>{c.description}</CtaDescription>}
                  rightAccessory={<CtaButton />}
                  leftAccessory={
                    <CtaImg
                      img={c.icon ? images[c.icon].childImageSharp.gatsbyImageData : null}
                      alt={`${c.title} icon`}
                    />
                  }
                />
              </CtaContainer>
            );
          })}
        </Flex>
      </Container>
    </Box>
  );
};
export default CtasSection;
