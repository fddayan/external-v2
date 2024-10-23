import React, { useContext, useState, useEffect } from "react";
import { AppDataContext } from "@src/components/AppDataContext";
import { ModalContext, ModalType } from "@src/components/modals/ModalController";
import { TranslationContext } from "@src/components/translation/TranslationContext";
import { PlayIcon, LockIcon } from "@classdojo/web/nessie/icons";
import * as S from "./styles";
import { theme } from "@src/components/nessie-web";

const {
  colors: { dt_white },
} = theme;

type VideoSlideProps = {
  poster_url: string;
  description: string;
  title: string;
  url: string;
  isNew: boolean;
  released: boolean;
};
const VideoSlide: React.FC<VideoSlideProps> = ({ poster_url, description, title, url, isNew, released }) => {
  const modalContext = useContext(ModalContext);

  function openSignupModal(e: { preventDefault: () => void }) {
    e.preventDefault();
    modalContext.showModal(ModalType.TeacherLogin, {
      form: { noRedirect: true, signToWatch: t.translate("directus.conundrums_page.sign_to_watch_text") },
    });
  }

  const appData = useContext(AppDataContext);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (appData.data.type) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [appData, isLoggedIn]);

  const t = useContext(TranslationContext);

  return (
    <S.VideoSlideContainer>
      <S.CardAndButtonContainer>
        <S.Card disabled={!released} bgSrc={poster_url} isNew={isNew}>
          <S.CardShadow />

          <S.VideoContent>
            {isNew && <S.Tag>{t.translate("directus.conundrums_page.video_new_tag")}</S.Tag>}
            {!released && <S.Tag released>{t.translate("directus.conundrums_page.video_coming_soon_tag")}</S.Tag>}
            <div>
              <S.VideoHeading color={dt_white}>{title}</S.VideoHeading>
              <S.DescriptionContainer>
                <S.Description color={dt_white}>{description}</S.Description>
              </S.DescriptionContainer>
            </div>
          </S.VideoContent>
        </S.Card>
        <S.VideoPlayButton
          onClick={isLoggedIn ? null : openSignupModal}
          href={isLoggedIn && released ? url : null}
          icon={isLoggedIn && released ? <PlayIcon size="m" /> : <LockIcon size="l" />}
          target="_blank"
        />
      </S.CardAndButtonContainer>
    </S.VideoSlideContainer>
  );
};

export default VideoSlide;
