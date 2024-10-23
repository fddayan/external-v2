import React from "react";
import { Flex, Box } from "@src/components/Boxes";
import { ChevronRightIcon } from "@classdojo/web/nessie/icons";
import { theme, Title, Subheading, DeprecatedDetailText, ListItem } from "@src/components/nessie-web";
import { css } from "@emotion/react";

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
    minWidth="400px"
    marginLeft="20px"
    css={css`
      @media only screen and (min-width: 992px) {
        &:first-child {
          margin-left: calc(50vw - 485px);
        }
        &:last-child {
          margin-right: calc(50vw - 485px);
        }
      }
      @media only screen and (min-width: 1170px) {
        &:first-child {
          margin-left: calc(50vw - 585px);
        }
        &:last-child {
          margin-right: calc(50vw - 585px);
        }
      }
    `}
  >
    <a style={{ width: "100%" }} href={url} target="_blank" rel="noreferrer">
      {children}
    </a>
  </Flex>
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

const UpcomingSection = ({ data }) => {
  const { content } = data;
  return (
    <Box padding={["30px 0", "60px 0"]} textAlign="center" backgroundColor={theme.colors.taro10}>
      <Title>Featured Training</Title>
      <Flex flexDirection="row" justifyContent="space-between" flexWrap="nowrap" overflowX="auto" marginTop="40px">
        {content.map((c, i) => {
          return (
            <CtaContainer url={c.url} key={i}>
              <ListItem
                title={<CtaTitle>{c.title}</CtaTitle>}
                description={<CtaDescription>{c.description}</CtaDescription>}
                rightAccessory={<CtaButton />}
              />
            </CtaContainer>
          );
        })}
      </Flex>
    </Box>
  );
};
export default UpcomingSection;
