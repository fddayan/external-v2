import React, { useContext } from "react";
import {
  Button,
  Title,
  BodyText,
  ListItem,
  Action,
  DetailText,
  QuoteIcon,
  ClassroomIcon,
  TimerIcon,
  DownloadIcon,
  Space,
  ChevronLeftIcon,
} from "@src/components/nessie-web";
import * as S from "./styles";
import { TranslationContext } from "@src/components/translation/TranslationContext";
import { css } from "@emotion/react";
import ShareButton from "../ShareButton";
import { logEvent } from "@src/utils/logClient";
import { IGatsbyImageData } from "gatsby-plugin-image";
import { getRelativePath } from "@src/utils/routes";
import { useFeatureFlag } from "@src/utils/useFeatureFlag";
import { ExternalSwitches } from "@src/utils/experiments/constants";
import { ModalContext, ModalType } from "@src/components/modals/ModalController";
import { ActivationRedirectionContext } from "@src/contexts/ActivationRedirectionContext";
import window from "global/window";
import { AppDataContext } from "@src/components/AppDataContext";
import { useCreateConvertExperimentEvent } from "@src/utils/experiment";

export interface AssetHeroSectionProps {
  title: string;
  description: string;
  previewImage: {
    filename_disk: string;
  };
  downloadUrl: string;
  slug: string;
  tags: string[];
  duration: number;
  grade: string;
  tip: string;
  language: string;
  teacher: {
    name: string;
    position: string;
    city: string;
    avatar: string;
  };
  isActivityTranslated: boolean;
  handleTagClick: (slug: string, label: string) => void;
}

const AssetHeroSection: React.FC<AssetHeroSectionProps> = (props) => {
  const isBrowser = typeof window !== "undefined" && typeof location !== "undefined";
  const convertActivityCornerExperiment = useCreateConvertExperimentEvent(
    ExternalSwitches.WEB_EXTERNAL_ACTIVITY_CORNER_POPUP_SIGNUP,
  );

  const { showModal } = useContext(ModalContext);
  const {
    data: { userData },
  } = useContext(AppDataContext);
  const { setSuccessAction } = useContext(ActivationRedirectionContext);
  const acPopupExperimentValue = useFeatureFlag(ExternalSwitches.WEB_EXTERNAL_ACTIVITY_CORNER_POPUP_SIGNUP).actualValue;
  const downloadPdf = () => {
    if (isBrowser) {
      window.open(props.downloadUrl, "_blank");
      convertActivityCornerExperiment();
    }
  };

  function showSignupModal() {
    setSuccessAction(() => {
      logEvent({
        eventName: `web.external.activity_corner.signup_modal_success`,
        experiments: [ExternalSwitches.WEB_EXTERNAL_ACTIVITY_CORNER_POPUP_SIGNUP],
      });
      downloadPdf();
    });
    showModal(ModalType.SignupCombinedModal, {
      dismissCtaAction: () => {
        logEvent({
          eventName: `web.external.activity_corner.signup_modal_dismiss`,
          experiments: [ExternalSwitches.WEB_EXTERNAL_ACTIVITY_CORNER_POPUP_SIGNUP],
        });
        downloadPdf();
      },
    });
  }

  function handleDownloadClick() {
    if (acPopupExperimentValue === "test" && userData === undefined) {
      logEvent({
        eventName: `web.external.activity_corner.signup_modal_popup`,
        eventValue: props.slug,
        metadata: { language: props.language },
        experiments: [ExternalSwitches.WEB_EXTERNAL_ACTIVITY_CORNER_POPUP_SIGNUP],
      });
      showSignupModal();
    } else {
      logEvent({
        eventName: `web.external.activity_corner.activity.download`,
        eventValue: props.slug,
        metadata: { language: props.language },
      });
      downloadPdf();
    }
  }
  const { translate: t } = useContext(TranslationContext);
  const shareData = {
    title: t(props.title)?.toString(),
    text: t(`dojo_inspo.share_activity`, { activity_name: t(props.title)?.toString() ?? "" })?.toString(),
    url: isBrowser ? location.href : null,
    image: props.previewImage,
  };
  return (
    <div css={css({ position: "relative" })}>
      <S.ActivityHeaderContainer>
        <S.ActivityHeader>
          <S.ActivityTitle>
            <Title size="2">{t(props.title)}</Title>
            <S.BackLink
              to={getRelativePath("/activity-corner/")}
              onClick={() =>
                logEvent({
                  eventName: `web.external.activity_corner.activity.back-link.touch`,
                  eventValue: props.slug,
                  metadata: { language: props.language },
                })
              }
            >
              <ChevronLeftIcon color="aqua50" size="s" />
              <Action>{t("dojo_inspo.back_to_main_page")}</Action>
            </S.BackLink>
          </S.ActivityTitle>
          <S.HeaderCtas>
            <Button onClick={handleDownloadClick} icon={<DownloadIcon />}>
              {t("components.buttons.download")} {!props.isActivityTranslated && t("layouts.main.in_english")}
            </Button>
            {isBrowser && <ShareButton shareData={shareData} slug={props.slug} language={props.language} />}
          </S.HeaderCtas>
        </S.ActivityHeader>
      </S.ActivityHeaderContainer>
      <S.ActivityPreview>
        <S.ActivityImage
          src={`https://static.classdojo.com/uploads/${props.previewImage.filename_disk}`}
          alt="Activity preview"
        />
        <S.ActivityDescription>
          <BodyText>{t(props.description)}</BodyText>
          <Space size="l" />
          <S.ActivityTags>
            {props.tags.map((tagLabel: string, index) => {
              const slug = t(tagLabel).toString().toLowerCase().replace(" ", "-");
              return (
                <Button
                  kind="secondary"
                  size="s"
                  key={index}
                  onClick={() => props.handleTagClick(slug, t(tagLabel).toString())}
                >
                  {t(tagLabel)}
                </Button>
              );
            })}
          </S.ActivityTags>
          <Space size="l" />
          <S.ActivityInfo>
            <ListItem
              leftAccessory={<TimerIcon />}
              description={
                <DetailText>{t("dojo_inspo.activity_duration", { time: props.duration.toString() })}</DetailText>
              }
            />
            <ListItem leftAccessory={<ClassroomIcon />} description={<DetailText>{t(props.grade)}</DetailText>} />
            <ListItem leftAccessory={<QuoteIcon />} description={<DetailText>{t(props.tip)}</DetailText>} />
          </S.ActivityInfo>
          <Space size="l" />
          <S.TeacherInfo>
            <S.TeacherAvatar src={props.teacher.avatar} alt="Teacher Avatar" loading="lazy" />
            <S.TeacherInfoText>{props.teacher.name}</S.TeacherInfoText>
            <S.TeacherInfoText>{t(props.teacher.position)}</S.TeacherInfoText>
            <S.TeacherInfoText>{t(props.teacher.city)}</S.TeacherInfoText>
          </S.TeacherInfo>
        </S.ActivityDescription>
      </S.ActivityPreview>
    </div>
  );
};

export default AssetHeroSection;
