import * as React from "react";
import * as S from "./cardStyles";
import { Box } from "@src/components/Boxes";
import { Heading } from "@src/components/nessie-web";

type Props = {
  poster_url: string;
  title: string;
  isNew: boolean;
  released: boolean;
  index: number;
  isActive: boolean;
  column: number;
  row: number;
  setVideoContainerData: () => void;
  openSubscriptionModal?: () => void;
};
const CardComponent: React.FC<Props> = ({
  poster_url,
  title,
  isNew,
  released,
  index,
  isActive,
  row,
  column,
  setVideoContainerData,
  openSubscriptionModal,
}) => {
  return (
    <Box position="relative">
      <S.Card
        onClick={released ? setVideoContainerData : openSubscriptionModal}
        isActive={isActive}
        index={index}
        disabled={!released}
        column={column}
        row={row}
      >
        {isNew && <S.Tag>NEW!</S.Tag>}
        <S.Poster src={poster_url} alt={`${title} thumbnail`} />
        <S.TitleWrapper>
          {released ? (
            <Heading>{title}</Heading>
          ) : (
            <Heading>Lesson {index}: Coming soon!</Heading>
          )}
        </S.TitleWrapper>
      </S.Card>
      {isActive && <S.ActiveChevron />}
    </Box>
  );
};

export default CardComponent;
