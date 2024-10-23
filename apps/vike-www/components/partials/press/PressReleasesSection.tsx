import React from "react";
import styled from "@emotion/styled";
import Translate from "@src/components/translation/Translate";
import Container from "@src/components/Container";
import { mediaQueries } from "@src/styles/theme";
import { Heading, Space, BodyText, theme, Title } from "@src/components/nessie-web";

const {
  colors: { dt_white, dt_taro10, dt_aqua50, dt_taro50 },
  radii: { dt_radius_m },
} = theme;

const PressReleasesSectionContainer = styled.section`
  width: 100%;
  text-align: center;
  padding: 75px 0;
  background-color: ${dt_taro10};

  ${mediaQueries[0]} {
    padding: 150px 0;
  }
`;

const PressReleasesContent = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 60px;

  ${mediaQueries[0]} {
    grid-template-columns: 1fr 1fr;
    row-gap: 30px;
    column-gap: 30px;
  }

  ${mediaQueries[1]} {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const PressReleaseItem = styled.div`
  border-radius: ${dt_radius_m};
  background-color: ${dt_white};
  padding: 30px;
  width: 100%;
  height: 100%;
  text-align: left;
  max-width: 375px;
  margin: auto;

  ${mediaQueries[0]} {
    max-width: unset;
    margin: 0;
  }
`;

const PressReleaseLink = styled.a`
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  letter-spacing: -0.25px;
  text-decoration: underline;
  text-underline-offset: 3px;
  color: ${dt_aqua50};
`;

type PressReleasesSectionProps = {
  press_releases_title: string;
  press_releases: { date: string; headline: string; url: string }[];
  read_more_text: string;
};

const PressReleasesSection: React.FC<PressReleasesSectionProps> = ({
  press_releases_title,
  press_releases,
  read_more_text,
}) => {
  return (
    <PressReleasesSectionContainer>
      <Container>
        <Title size={2}>
          <Translate path={press_releases_title} />
        </Title>
        <Space size="xxl" />
        <PressReleasesContent>
          {press_releases.map((release, idx) => (
            <PressReleaseItem key={`release_${idx + 1}`}>
              <BodyText color={dt_taro50}>
                <Translate path={release.date} />
              </BodyText>
              <Space size="m" />
              <Heading>
                <Translate path={release.headline} />
              </Heading>
              <Space size="m" />
              <PressReleaseLink href={release.url}>
                <Translate path={read_more_text} />
              </PressReleaseLink>
            </PressReleaseItem>
          ))}
        </PressReleasesContent>
      </Container>
    </PressReleasesSectionContainer>
  );
};

export default PressReleasesSection;
