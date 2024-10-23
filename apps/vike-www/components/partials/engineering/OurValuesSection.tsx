import React from "react";
import styled from "@emotion/styled";
import Container from "@src/components/Container";
import { theme, Heading, Title, Space } from "@src/components/nessie-web";
import { mediaQueries } from "@src/styles/theme";
import Translate from "@src/components/translation/Translate";

const {
  colors: { dt_white, dt_taro90, dt_taro50, dt_taro30 },
} = theme;

const OurValuesSectionContainer = styled.section`
  padding: 54px 0;
  background-color: ${dt_white};

  ${mediaQueries[0]} {
    padding: 108px 0;
  }
`;

const ValueWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${mediaQueries[0]} {
    margin: auto;
  }
`;

const ValueRow = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ValueColumn = styled.div`
  width: 100%;
  display: block;
  padding: 15px;
  ${mediaQueries[0]} {
    width: 50%;
    display: inline-block;
  }
`;

const ValueCard = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${dt_white};
  border-radius: 32px;
  border: 2px solid ${dt_taro30};
  padding: 32px;
  height: 100%;
  ${mediaQueries[0]} {
    flex-direction: row;
  }
`;

const ValueImage = styled.div`
  & > img {
    width: 100px;
    height: 100px;
  }
  text-align: center;
`;

const ValueContent = styled.div`
  flex: 1;
  text-align: center;
  ${mediaQueries[0]} {
    padding-left: 32px;
    text-align: left;
  }
`;

const ValueText = styled.p`
  color: ${dt_taro50};
  margin-top: 8px;
`;

type OurValuesSectionProps = {
  values_heading: string;
  values_sub_heading: string;
  values_items: any;
};

const ResponsiveTitle = styled(Title)`
  font-size: 30px;
  ${mediaQueries[1]} {
    font-size: 50px;
  }
`;

const ResponsiveSubtitle = styled(Title)`
  font-size: 18px;
  line-height: 1.6rem;
  ${mediaQueries[1]} {
    font-size: 30px;
  }
`;

const OurValuesSection: React.FC<OurValuesSectionProps> = ({
  values_heading,
  values_sub_heading,
  values_items,
}: {
  values_heading: string;
  values_sub_heading: string;
  values_items: { icon: string; title: string; text: string }[];
}) => {
  return (
    <>
      <OurValuesSectionContainer>
        <Container>
          <ValueWrapper>
            <ResponsiveTitle size={2} color={dt_taro90}>
              <Translate path={values_heading} />
            </ResponsiveTitle>
            <Space size="s" />
            <ResponsiveSubtitle size={1} color={dt_taro50} textAlign="center">
              <Translate path={values_sub_heading} />
            </ResponsiveSubtitle>
            <Space size="xxl" />
            <ValueRow>
              {values_items.map((item, idx) => (
                <ValueColumn key={idx}>
                  <ValueCard>
                    <ValueImage>
                      <img src={item.icon} alt={item.title} height="100px" width="100px" />
                    </ValueImage>
                    <ValueContent>
                      <Heading>{item.title}</Heading>
                      <ValueText>{item.text}</ValueText>
                    </ValueContent>
                  </ValueCard>
                </ValueColumn>
              ))}
            </ValueRow>
          </ValueWrapper>
        </Container>
      </OurValuesSectionContainer>
    </>
  );
};

export default OurValuesSection;
