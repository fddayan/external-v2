import React from "react";
import { Box, Flex } from "@src/components/Boxes";
import { css } from "@emotion/react";
import Container from "@src/components/Container";
import styled from "@emotion/styled";
import Translate from "@src/components/translation/Translate";
import Button from "@src/components/Button";
import { getRelativePath } from "@src/utils/routes";

const Title = styled("h2")`
  font-size: 18px;
  font-weight: 600;
  line-height: 40px;
  margin: 0 0 6px;
`;

const Text = styled("p")`
  font-size: 16px;
  margin: 0 auto 18px;
  max-width: 30em;
  text-align: center;
`;

const OpeningsSection = () => {
  return (
    <Box
      css={css`
        background-color: #f5f5f3;
        color: #363636;
        padding-bottom: 0;
        padding-top: 60px;
      `}
    >
      <Container paddingBottom="70px">
        <Flex alignItems="center" flexDirection="column">
          <Title>
            <Translate path="directus.page_about.jobs_title" />
          </Title>
          <Text>
            <Translate path="directus.page_about.jobs_text" />
          </Text>
          <Button as="a" href={getRelativePath("/jobs/")}>
            <Translate path="directus.page_about.jobs_button_text" />
          </Button>
        </Flex>
      </Container>
    </Box>
  );
};

export default OpeningsSection;
