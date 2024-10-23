import React, { useState } from "react";
import { graphql, useStaticQuery } from "gatsby";
import Container from "@src/components/Container";
import { Box } from "@src/components/Boxes";
import {
  ModalContext,
  ModalType,
} from "@src/components/modals/ModalController";
import CardComponent from "./CardComponent";
import VideoContainerComponent from "./VideoContainerComponent";
import * as S from "./styles";
import { TranslationType } from "@src/components/translation/TranslationContext";

type VideoBoardProps = {
  videos: {
    new: boolean;
    released: boolean;
    title: string;
    description: string;
    url: string;
    poster_url: string;
  }[];
  modalData: {
    label?: string | TranslationType;
    sendGridId?: string | TranslationType;
  };
};
const VideoBoardSection: React.FC<VideoBoardProps> = ({
  videos,
  modalData,
}) => {
  const [activeVideoData, setActiveVideo] = useState({
    title: "",
    description: "",
    url: "",
    image: "",
    order: "",
  });
  const [isVideoContainerShow, setVideoContainerShow] = useState(false);
  const [isVideoContainerActiveIndex, setVideoContainerActiveIndex] =
    useState(null);

  const { showModal } = React.useContext(ModalContext);
  const openSubscriptionModal = () =>
    showModal(ModalType.SendgridModal, modalData);

  const CardsBoard = videos.map((video, index) => {
    const row = Math.floor(index / 3) + 1;
    const col = (index % 3) + 2;
    return (
      <CardComponent
        column={col}
        row={row}
        setVideoContainerData={() => openVideoContainer(index)}
        openSubscriptionModal={openSubscriptionModal}
        // modalFunction
        index={index + 1}
        isActive={isVideoContainerActiveIndex == index}
        key={index}
        isNew={video.new}
        {...video}
      />
    );
  });

  function closeVideoContainerData() {
    setVideoContainerShow(false);
    setVideoContainerActiveIndex(null);
    history.replaceState(null, null, " ");
  }

  function openVideoContainer(index) {
    const { title, description, url, poster_url } = videos[index];
    setVideoContainerActiveIndex(index);
    setActiveVideo({
      title,
      description,
      url,
      image: poster_url,
      order: index,
    });
    setVideoContainerShow(true);
  }

  return (
    <Box backgroundColor="#EAECF5" paddingY="80px">
      <Container>
        <S.CardsGrid>
          {CardsBoard}
          {isVideoContainerShow && (
            <VideoContainerComponent
              close={closeVideoContainerData}
              {...activeVideoData}
            />
          )}
        </S.CardsGrid>
      </Container>
    </Box>
  );
};

export default VideoBoardSection;
