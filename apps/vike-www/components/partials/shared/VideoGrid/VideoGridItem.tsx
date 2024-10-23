import React from "react";
import * as S from "./gridItemStyles";
import { useVideoGrid } from "./VideoGridContext";
import { Flex } from "@src/components/Boxes";
import { GridItem } from "@src/components/Grid";
import { TranslationType } from "@src/components/translation/TranslationContext";

type Props = {
  isNew: boolean;
  released: boolean;
  index: number;
  children: React.ReactNode;
  url: string;
  image: string;
  modalData: {
    label?: string | TranslationType;
    sendGridId?: string | TranslationType;
  };
  videoPreview: any;
};
const VideoGridItem: React.FC<Props> = ({ url, image, isNew, released, index, children, modalData, videoPreview }) => {
  const { openVideoContainer, openSubscriptionModal, videoContainerActiveIndex } = useVideoGrid();

  const setVideoContainerData = () => openVideoContainer({ url, image, index, videoPreview });

  const row = Math.floor(index / 3) + 1;

  return (
    <GridItem colSpan={[12, 4]}>
      <Flex position="relative">
        <S.Card
          onClick={released ? setVideoContainerData : () => openSubscriptionModal(modalData)}
          isActive={videoContainerActiveIndex}
          index={index}
          disabled={!released}
        >
          {isNew && <S.Tag>NEW!</S.Tag>}
          {children}
        </S.Card>
      </Flex>
    </GridItem>
  );
};

export default VideoGridItem;
