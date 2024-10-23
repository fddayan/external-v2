import React from "react";
import { mediaQueries } from "@src/styles/theme";
import styled from "@emotion/styled";
import { Box, BoxProps, Flex } from "@src/components/Boxes";
import Container from "@src/components/Container";
import { Text } from "@src/components/Text";
import GatsbyImageWrapper from "../GatsbyImageWrapper";

const Header = styled("h2")`
  text-align: center;
  padding-top: 25px;
  margin-top: 0;
  font-weight: 800;
  font-size: 24px;
  color: ${(props: any) => props.theme.colors.text};
  line-height: 32px;
  ${mediaQueries[2]} {
    line-height: 40px;
  }
`;

const ItemWrapper = styled(Box)`
  padding-left: 15px;
  padding-right: 15px;
`;
ItemWrapper.defaultProps = { width: ["100%", 1 / 3] };

const ItemBox = styled(Flex)`
  position: relative;
  border-radius: 5px;
  padding: 0px 10px 0px;
  width: 100%;
  margin-bottom: 30px;
  max-width: 292px;
  margin-left: auto;
  margin-right: auto;
`;

ItemBox.defaultProps = { flexDirection: "column", alignItems: "center" };

const ItemBoxImg = styled(GatsbyImageWrapper)`
  margin: 0 auto;
`;

const ItemBoxHeader = styled("h3")`
  color: #363636;
  font-size: 21px;
  line-height: 24px;
  font-weight: 800;
  margin-top: 22px;
  margin-bottom: 20px;
  text-align: left;
  width: 100%;
`;

const IconInfoItem = ({
  image,
  header,
  text,
  ...props
}: { image: { filename_disk: string }; header: string; text: string } & BoxProps) => {
  return (
    <ItemWrapper {...props}>
      <ItemBox>
        <ItemBoxImg image={image} />
        <ItemBoxHeader>{header}</ItemBoxHeader>
        <Text textAlign="left" lineHeight={4} fontSize={2}>
          {text}
        </Text>
      </ItemBox>
    </ItemWrapper>
  );
};

type IconInfoListProps = {
  header: string;
  icon_infos: Array<{
    image: any;
    title: string;
    text: string;
  }>;
};
const IconInfoList: React.FC<IconInfoListProps> = ({ header, icon_infos }) => {
  return (
    <Flex as="section" flexDirection="column" paddingY="66px" backgroundColor="#fff">
      <Header>{header}</Header>
      <Container>
        <Flex
          flexWrap="wrap"
          justifyContent="center"
          alignItems="start"
          width="100%"
          maxWidth={["100%"]}
          marginX="auto"
          paddingTop="80px"
        >
          {icon_infos.map((item, index) => (
            <IconInfoItem key={`icons-info-${index}`} image={item.image} header={item.title} text={item.text} />
          ))}
        </Flex>
      </Container>
    </Flex>
  );
};

export default IconInfoList;
