import * as React from "react";
import { PlayIcon } from "@classdojo/web/nessie/icons";
import * as S from "./videoContainerStyles";
import { Title, BodyText, Space, Button } from "@src/components/nessie-web";

type Props = {
  title: string;
  description: string;
  url: string;
  image: string;
  order: string;
  close: () => void;
};

const VideoContainerComponent = ({ title, description, url, image, order, close }: Props) => {
  const gridOrder = parseInt(order);

  return (
    <S.Wrapper active={gridOrder} backgroundColor="#ffffff">
      <S.FullFlex id={`card${order}`} order={gridOrder}>
        <S.ButtonClose onClick={() => close()}>&#x2715;</S.ButtonClose>
        <S.TextWrapper paddingTop="60px">
          <Title>{title}</Title>
          <Space size="l" />
          <BodyText>{description}</BodyText>
          <Space size="l" />
          <Button kind="primary" href={url} target="_blank">
            <S.ButtonContent>
              <PlayIcon color="white" size="s" />
              <Space size="s" kind="inline" />
              Watch
            </S.ButtonContent>
          </Button>
        </S.TextWrapper>
        <S.VideoCta imageUrl={image}>
          <S.PlayButton href={url} target="_blank" />
        </S.VideoCta>
      </S.FullFlex>
    </S.Wrapper>
  );
};

export default VideoContainerComponent;
