import React, { useContext } from "react";
import Container from "@src/components/Container";
import { Space, theme } from "@src/components/nessie-web";
import styled from "@emotion/styled";
import { TranslationContext } from "@src/components/translation/TranslationContext";
import { mediaQueries } from "@src/styles/theme";

const {
  colors: { dt_white, dt_taro90, dt_taro50 },
} = theme;

const BenefitsSectionContainer = styled.section`
  background: #e4f3ff;
  padding: 40px 0;
  overflow: hidden;

  ${mediaQueries[0]} {
    padding: 108px 0;
  }
`;

const BenefitsTableContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  max-width: 550px;
  margin: auto;
`;

const BenefitsBalloon = styled.div<{ desktopBg: string; mobileBg: string }>`
  background-image: url("${(props) => props.mobileBg}");
  background-repeat: no-repeat;
  background-size: contain;
  font-size: 15px;
  font-weight: 800;
  padding: 30px 20px 10px 20px;
  color: #2c2a50;
  line-height: 100%;
  text-align: center;
  width: 300px;
  height: 68px;
  position: absolute;
  right: 10px;
  bottom: 0;

  ${mediaQueries[1]} {
    background-image: url("${(props) => props.desktopBg}");
    font-size: 18px;
    position: absolute;
    bottom: 30px;
    right: -230px;
    width: 200px;
    height: 94px;
    padding: 15px 5px;
  }
`;

const BenefitsTable = styled.table`
  border: none;
  margin: 0;
  tr:nth-of-type(odd) td {
    background: white;
  }
  tr:nth-of-type(even) td {
    background: #f7f8ff;
  }
  td,
  th {
    background: none;
    border: none;
  }
  th {
    font-size: 12px;
    padding: 0 10px;
    &:last-child {
      padding-right: 15px;
    }
  }
  td {
    padding: 10px 15px;
    font-size: 18px;
    font-weight: 600;
    color: #2c2a50;
    &:last-child {
      padding-right: 20px;
    }
    ${mediaQueries[0]} {
      padding: 10px 30px;
    }
  }
  tbody tr:first-of-type td:first-child {
    border-radius: 20px 0 0 0;
  }
  tbody tr:first-of-type td:last-child {
    border-radius: 0 20px 0 0;
  }
`;

const BenefitsFooter = styled.div`
  padding: 16px 20px;
  margin-left: -10px;
  margin-right: -10px;
  margin-bottom: 80px;
  background-color: ${dt_white};
  border-radius: 12px;
  border: 2px solid #3a74ff;
  box-shadow: 0px 6px 0px rgba(45, 64, 150, 0.06);
  display: flex;
  font-weight: 700;
  font-size: 18px;
  width: calc(100% + 20px);
  max-width: 570px;
  span {
    width: 90px;
    &:first-child {
      flex-grow: 1;
    }
    &:not(:first-child) {
      text-align: center;
    }
  }
  ${mediaQueries[1]} {
    padding: 16px 10px 16px 40px;
    margin-bottom: 0;
  }
`;

const BenefitsTab2 = styled.div`
  background: #3a74ff;
  border-radius: 12px 12px 0 0;
  text-align: center;
  padding: 10px;
  color: white;
  line-height: 100%;
  height: 45px;
  margin-bottom: 0px;
`;

const BenefitsTab1 = styled.div`
  background: #d3d7ec;
  border-radius: 12px 12px 0 0;
  text-align: center;
  padding: 10px;
  color: #2c2a50;
  line-height: 100%;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BenefitsTitle = styled.h2`
  font-size: 24px;
  font-weight: 800;
  line-height: 30px;
  text-align: center;
  letter-spacing: -0.25px;
  color: ${dt_taro90};
  max-width: 60%;
  margin: 0 auto;
  margin-bottom: 54px;

  ${mediaQueries[0]} {
    font-weight: 800;
    font-size: 50px;
    line-height: 100%;
    letter-spacing: -0.5px;
    max-width: 100%;
  }
`;

const BenefitsSubtitle = styled.h2`
  font-size: 18px;
  font-weight: 800;
  line-height: 100%;
  text-align: center;
  letter-spacing: -0.25px;
  color: ${dt_taro50};
  margin: auto;

  ${mediaQueries[0]} {
    font-weight: 800;
    font-size: 24px;
    max-width: 60%;
  }
`;

type BenefitsSectionProps = {
  benefits_title: string;
  benefits_text: string;
  benefits_classdojo_tab: string;
  benefits_classdojo_school_tab: string;
  benefits: {
    available_classdojo: boolean;
    available_classdojo_school: boolean;
  }[];
  benefit_name_translation_path: string;
  classdojo_check_url: string;
  classdojo_school_check_url: string;
  checked_alt: string;
  cost_text: string;
  classdojo_cost_text: string;
  classdojo_school_cost_text: string;
  benefits_bubble_text: string;
  bubble_desktop_image_url: string;
  bubble_mobile_image_url: string;
};

const BenefitsSection: React.FC<BenefitsSectionProps> = ({
  benefits_title,
  benefits_text,
  benefits_classdojo_tab,
  benefits_classdojo_school_tab,
  benefits,
  benefit_name_translation_path,
  classdojo_check_url,
  classdojo_school_check_url,
  checked_alt,
  cost_text,
  classdojo_cost_text,
  classdojo_school_cost_text,
  benefits_bubble_text,
  bubble_desktop_image_url,
  bubble_mobile_image_url,
}) => {
  const t = useContext(TranslationContext);

  return (
    <BenefitsSectionContainer>
      <Container>
        <BenefitsTitle>{t.translate(benefits_title)}</BenefitsTitle>
        <Space size="m" />
        <BenefitsSubtitle>{t.translate(benefits_text)}</BenefitsSubtitle>
        <Space size="xl" />
        <BenefitsTableContainer>
          <BenefitsTable>
            <thead>
              <tr>
                <th></th>
                <th style={{ width: "100" }}>
                  <BenefitsTab1>{t.translate(benefits_classdojo_tab)}</BenefitsTab1>
                </th>
                <th style={{ width: "100" }}>
                  <BenefitsTab2>{t.translate(benefits_classdojo_school_tab)}</BenefitsTab2>
                </th>
              </tr>
            </thead>
            <tbody>
              {benefits.map((benefit, idx) => (
                <tr key={`benefit_${idx + 1}`}>
                  <td>{t.translate(benefit_name_translation_path + `${idx + 1}`)}</td>
                  <td align="center">
                    {benefit.available_classdojo && (
                      <img src={classdojo_check_url} alt={t.translate(checked_alt) as string} />
                    )}
                  </td>
                  <td align="center">
                    {benefit.available_classdojo_school && (
                      <img src={classdojo_school_check_url} alt={t.translate(checked_alt) as string} />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </BenefitsTable>
          <BenefitsFooter>
            <span>{t.translate(cost_text)}</span>
            <span>{t.translate(classdojo_cost_text)}</span>
            <span>{t.translate(classdojo_school_cost_text)}</span>
          </BenefitsFooter>
          <BenefitsBalloon desktopBg={bubble_desktop_image_url} mobileBg={bubble_mobile_image_url}>
            {t.translate(benefits_bubble_text)}
          </BenefitsBalloon>
        </BenefitsTableContainer>
      </Container>
    </BenefitsSectionContainer>
  );
};

export default BenefitsSection;
