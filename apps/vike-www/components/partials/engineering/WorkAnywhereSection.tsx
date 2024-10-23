import React from "react";
import styled from "@emotion/styled";
import Container from "@src/components/Container";
import Translate from "@src/components/translation/Translate";
import { mediaQueries } from "@src/styles/theme";
import { Title, Space } from "@src/components/nessie-web";

const WorkAnywhereSectionContainer = styled.section`
  width: 100%;
  padding: 32px 0;

  ${mediaQueries[0]} {
    padding: 150px 0;
  }
`;

const WorkAnywhereContent = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;

  ${mediaQueries[0]} {
    flex-direction: row;
    justify-content: space-between;
  }
  ${mediaQueries[1]} {
    max-width: 970px;
    margin: 0 auto;
  }
`;

const WFATextContent = styled.div`
  flex: 1;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const EmbedVideo = styled.video`
  height: 100%;
  width: 100%;
  ${mediaQueries[0]} {
    max-width: 50%;
  }
`;

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

type WorkAnywhereSectionProps = {
  work_anywhere_heading: string;
  work_anywhere_subheading: string;
  work_anywhere_text: string;
  work_anywhere_animation: string;
};

const WorkAnywhereSection: React.FC<WorkAnywhereSectionProps> = ({
  work_anywhere_heading,
  work_anywhere_subheading,
  work_anywhere_text,
  work_anywhere_animation,
}) => {
  return (
    <WorkAnywhereSectionContainer>
      <Container>
        <WorkAnywhereContent>
          <WFATextContent>
            <ResponsiveTitle size={2}>
              <Translate path={work_anywhere_heading} />
            </ResponsiveTitle>
            <Space size="l" />
            <ResponsiveSubtitle size={1} color="dt_taro50">
              <Translate path={work_anywhere_subheading} />
            </ResponsiveSubtitle>
            <Space size="m" />
            <Translate path={work_anywhere_text} />
          </WFATextContent>
          <EmbedVideo playsInline autoPlay muted loop>
            <source src={work_anywhere_animation} type="video/mp4" />
          </EmbedVideo>
        </WorkAnywhereContent>
      </Container>
    </WorkAnywhereSectionContainer>
  );
};

export default WorkAnywhereSection;
