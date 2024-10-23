import React, { useContext } from "react";
import styled from "@emotion/styled";
import Container from "@src/components/Container";
import { DetailText, BodyText, Heading, Space, theme } from "@src/components/nessie-web";
import { mediaQueries } from "@src/styles/theme";
import { TranslationContext } from "@src/components/translation/TranslationContext";

const {
  colors: { dt_kiwi20, dt_white },
  radii: { dt_radius_m },
} = theme;

const PerksSectionContainer = styled.section`
  width: 100%;
  margin-bottom: 18px;

  ${mediaQueries[1]} {
    margin-top: -72px;
  }
`;

const PerksContent = styled.div`
  width: 100%;
  background-color: ${dt_kiwi20};
  border-radius: ${dt_radius_m};
  padding: 18px;
  display: flex;
  flex-direction: column;

  ${mediaQueries[0]} {
    padding: 30px;
    flex-direction: row;
  }
`;

const BadgeTextBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 18px;

  ${mediaQueries[0]} {
    width: 50%;
    flex-direction: row;
    justify-content: flex-start;
    text-align: left;
    margin-bottom: 0px;
  }
`;

const PerksListBlock = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  background-color: ${dt_white};
  border-radius: ${dt_radius_m};
  padding: 18px;

  ${mediaQueries[0]} {
    width: 50%;
  }

  ${mediaQueries[1]} {
    grid-template-columns: 1fr 1fr;
    padding: 18px;
  }
`;

const StarBadge = styled.img`
  width: 66px;
  height: 66px;
  margin-bottom: 18px;

  ${mediaQueries[0]} {
    margin-bottom: 0px;
  }
`;

const TextWrapper = styled.div`
  ${mediaQueries[0]} {
    padding: 0 24px;
  }
`;

const Perk = styled.li`
  display: flex;
  align-items: flex-start;
  padding-bottom: 12px;

  &:last-of-type {
    padding-bottom: 0px;
  }

  &:nth-of-type(3) {
    ${mediaQueries[1]} {
      padding-bottom: 0px;
    }
  }
`;

const PerkCheck = styled.img`
  padding-right: 8px;
`;

type PerksSectionProps = {
  star_badge_icon: any;
  star_badge_alt: string;
  perks_title: string;
  perks_text: string;
  perks: any;
  perks_check_icon: any;
  perks_check_alt: any;
};

const PerksSection: React.FC<PerksSectionProps> = ({
  star_badge_icon,
  star_badge_alt,
  perks_title,
  perks_text,
  perks,
  perks_check_icon,
  perks_check_alt,
}) => {
  const t = useContext(TranslationContext);
  return (
    <PerksSectionContainer>
      <Container>
        <PerksContent>
          <BadgeTextBlock>
            <StarBadge src={star_badge_icon.file.publicURL} alt={star_badge_alt} />
            <TextWrapper>
              <Heading>{t.translate(perks_title)}</Heading>
              <Space size="xs" />
              <BodyText>{t.translate(perks_text)}</BodyText>
            </TextWrapper>
          </BadgeTextBlock>
          <PerksListBlock>
            {perks.map((perk, idx) => (
              <Perk key={`perk_${idx + 1}`}>
                <PerkCheck src={perks_check_icon.file.publicURL} alt={t.translate(perks_check_alt) as string} />
                <DetailText>{t.translate(`directus.page_schools.perks.perk_${idx + 1}`)}</DetailText>
              </Perk>
            ))}
          </PerksListBlock>
        </PerksContent>
      </Container>
    </PerksSectionContainer>
  );
};

export default PerksSection;
