import React, { useContext, useRef, useState } from "react";
import {
  Title,
  Action,
  BodyText,
  Button,
  Space,
  PlayIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "@src/components/nessie-web";
import Container from "@src/components/Container";
import {
  ModalContext,
  ModalType,
} from "@src/components/modals/ModalController";
import { logEvent } from "@src/utils/logClient";
import {
  CardContainer,
  VideoCard,
  VideoCardThumbContainer,
  VideoCardThumb,
  VideoCardContent,
  VideoCardDetails,
  VideoCardPlayButton,
  ButtonContainer,
  RightScrollButton,
  LeftScrollButton,
} from "./styles";
import Translate from "@src/components/translation/Translate";
import ResourceDownloadButton from "../ResourceDownloadButton";
import {
  resourcesLogBaseName,
  createResourceEventName,
} from "@src/utils/resources";
import { TranslationContext } from "@src/components/translation/TranslationContext";
import { css } from "@emotion/react";

interface TutorialsProps {
  tutorials: {
    title: string;
    description: string;
    thumbnail: string;
    videoId: string;
  }[];
  url: string;
  isTranslatedPlaylistAvailable: boolean;
}

const NavSection: React.FC<TutorialsProps> = ({
  tutorials,
  url,
  isTranslatedPlaylistAvailable,
}) => {
  const modalContext = useContext(ModalContext);
  const t = useContext(TranslationContext);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAtLeft, setIsAtLeft] = useState(true);
  const [isAtRight, setIsAtRight] = useState(false);

  function openVideoModal(youtubeID, eventName) {
    logEvent(eventName);
    modalContext.showModal(ModalType.VideoModal, { youtubeID });
  }

  function handleScroll() {
    if (scrollRef.current) {
      const container = scrollRef.current;
      setIsAtLeft(container.scrollLeft === 0);
      setIsAtRight(
        Math.ceil(container.scrollLeft) + container.clientWidth >=
          container.scrollWidth
      );
    }
  }

  function scrollFilterContainer(scrollAmount: number) {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  }

  return (
    <>
      <Container>
        <Space size="xl" />
        <Title size="2" textAlign="center">
          <Translate path="directus.page_resources_2023.video_tutorials_heading" />
        </Title>
        <Space size="xxl" />
        <CardContainer ref={scrollRef} onScroll={handleScroll}>
          <LeftScrollButton className={!isAtLeft ? "active" : ""}>
            <Button
              css={css({ width: 44 })}
              size="s"
              icon={<ChevronLeftIcon />}
              onClick={() => scrollFilterContainer(-300)}
              disabled={isAtLeft}
            />
          </LeftScrollButton>
          {tutorials.map((tutorial, index) => {
            const eventName = createResourceEventName(
              t.translate(tutorial.title)
            );
            return (
              <VideoCard
                key={index}
                onClick={() => openVideoModal(tutorial.videoId, eventName)}
              >
                <VideoCardThumbContainer>
                  <VideoCardThumb src={tutorial.thumbnail} loading="lazy" />
                </VideoCardThumbContainer>
                <VideoCardContent>
                  <VideoCardDetails>
                    <Action as="h3">
                      <Translate path={tutorial.title} />
                    </Action>
                    <BodyText>
                      <Translate path={tutorial.description} />
                    </BodyText>
                  </VideoCardDetails>
                  <VideoCardPlayButton
                    icon={<PlayIcon />}
                    size="s"
                  ></VideoCardPlayButton>
                </VideoCardContent>
              </VideoCard>
            );
          })}
          <RightScrollButton className={!isAtRight ? "active" : ""}>
            <Button
              size="s"
              icon={<ChevronRightIcon />}
              css={css({ width: 44 })}
              onClick={() => scrollFilterContainer(300)}
              disabled={isAtRight}
            />
          </RightScrollButton>
        </CardContainer>
        <ButtonContainer>
          <ResourceDownloadButton
            path={url}
            eventName={resourcesLogBaseName + "all_video_tutorials"}
          >
            <Translate path="directus.page_resources_2023.tutorial_button_label" />
            {!isTranslatedPlaylistAvailable && (
              <>
                {" "}
                <Translate path="layouts.main.in_english" />
              </>
            )}
          </ResourceDownloadButton>
        </ButtonContainer>
      </Container>
    </>
  );
};

export default NavSection;
