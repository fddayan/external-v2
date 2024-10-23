import React from "react";
import { Text } from "@src/components/Text";
import { Box, Flex } from "@src/components/Boxes";
import styled from "@emotion/styled";
import { mediaQueries } from "@src/styles/theme";

const Header = styled("h2")<{ fontSize: number }>`
  text-align: center;
  display: block;
  width: 100%;
  padding: 36px 0 52px 0;
  margin-top: 0;
  font-weight: 800;
  font-size: 24px;
  color: ${(props: any) => props.theme.colors.text};
  line-height: 32px;
  ${mediaQueries[2]} {
    line-height: 40px;
  }
`;

const TextWithHeader: React.FC<{ title?: string; text: string }> = ({ text, title }) => {
  return (
    <Flex flexDirection="column" marginBottom="50px">
      {title && <Header fontSize={3}>{title}</Header>}
      <Box width={[10 / 12, 8 / 12]} mx="auto">
        <Text dangerouslySetInnerHTML={{ __html: text }} />
      </Box>
    </Flex>
  );
};

export default TextWithHeader;
