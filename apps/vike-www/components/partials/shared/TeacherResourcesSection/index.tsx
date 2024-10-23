/* eslint-disable react/jsx-no-target-blank */
import React, { useContext } from "react";
import * as S from "./styles";
import { Title, DetailText, Space, Button } from "@src/components/nessie-web";
import { GatsbyImage } from "gatsby-plugin-image";
import { ModalContext, ModalType } from "@src/components/modals/ModalController";
import { DropDown, DropDownItem } from "@src/components/Dropdown";
import Translate from "@src/components/translation/Translate";
import MarkedTranslate from "@src/components/translation/MarkedTranslate";

type TeacherResourcesSectionProps = {
  teachers_hero_video_url: string;
  teachers_hero_image: any;
  teachers_hero_image_alt: string;
  teachers_hero_image_link: string;
  teachers_hero_pdf_language_map: any;
  teachers_hero_title: string;
  teachers_hero_text: string;
  teachers_hero_pdf_btn: string;
  teachers_hero_video_btn: string;
};

const TeacherResourcesSection: React.FC<TeacherResourcesSectionProps> = ({
  teachers_hero_video_url,
  teachers_hero_image,
  teachers_hero_image_alt,
  teachers_hero_image_link,
  teachers_hero_pdf_language_map,
  teachers_hero_title,
  teachers_hero_text,
  teachers_hero_pdf_btn,
  teachers_hero_video_btn,
}) => {
  const modalContext = useContext(ModalContext);

  function openVideoModal(youtubeID) {
    modalContext.showModal(ModalType.VideoModal, { youtubeID });
  }

  return (
    <S.TeacherTile>
      <S.ImageLink href={teachers_hero_image_link}>
        <GatsbyImage image={teachers_hero_image.file.childImageSharp.gatsbyImageData} alt={teachers_hero_image_alt} />
      </S.ImageLink>
      <S.ContentFlex>
        <S.CenterLeftText>
          <Title>
            <Translate path={teachers_hero_title} />
          </Title>
          <Space size="m" />
          <DetailText>
            <MarkedTranslate path={teachers_hero_text} />
          </DetailText>
        </S.CenterLeftText>
        <Space size="m" />
        <S.InnerContentFlex>
          <DropDown
            Trigger={(props) => (
              <Button {...props}>
                <Translate path={teachers_hero_pdf_btn} /> <S.Caret />
              </Button>
            )}
          >
            {Object.entries(teachers_hero_pdf_language_map).map((item) => (
              <DropDownItem key={`pdf-lang-${item[0]}`}>
                <a href={item[1] as string} target="_blank">
                  {item[0].replace("_", " ")}
                </a>
              </DropDownItem>
            ))}
          </DropDown>
          <Space size="m" />
          <Button kind="secondary" onClick={() => openVideoModal(teachers_hero_video_url)}>
            <Translate path={teachers_hero_video_btn} />
          </Button>
        </S.InnerContentFlex>
      </S.ContentFlex>
    </S.TeacherTile>
  );
};

export default TeacherResourcesSection;
