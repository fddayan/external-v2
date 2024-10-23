import React, { useMemo } from "react";

export interface VimeoEmbedProps {
  url: string;
  autoPlay?: boolean;
  autoPause?: boolean;
  muted?: boolean;
  noControls?: boolean;
}

type VimeoEmbedBool = 1 | 0 | "true" | "false";

interface VimeoUrl {
  id: string;
  autoplay: VimeoEmbedBool;
  autoPause: VimeoEmbedBool;
  muted: VimeoEmbedBool;
  controls: VimeoEmbedBool;
}

const buildVimeoUrl = ({ id, autoplay, autoPause, muted, controls }: VimeoUrl) => {
  const params = {
    autoplay: autoplay,
    autopause: autoPause,
    muted,
    dnt: 1,
    player_id: 0,
    app_id: 58479,
    loop: 1,
    title: 0,
    byline: 0,
    controls,
  };

  const paramsString = Object.entries(params).reduce((acc, [key, value]) => {
    return `${acc}&${key}=${value}`;
  }, "");

  // return `https://player.vimeo.com/video/${id}?autopause=${autoPause}&autoplay=${autoplay}&dnt=1&player_id=0&app_id=58479&loop=1&title=0&byline=0&muted=${muted}`;
  return `https://player.vimeo.com/video/${id}?${paramsString}`;
};

const VimeoEmbed = ({ url, autoPlay = true, autoPause = false, muted = true, noControls = false }: VimeoEmbedProps) => {
  const id = url.split("/")[3];

  const srcUrl = useMemo(
    () =>
      buildVimeoUrl({
        id,
        autoplay: autoPlay ? 1 : 0,
        autoPause: autoPause ? 1 : 0,
        muted: muted ? 1 : 0,
        controls: noControls ? 0 : 1,
      }),
    [id, autoPlay, autoPause, muted, noControls],
  );

  return (
    <>
      <iframe
        title="vimeo embed"
        src={srcUrl}
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      ></iframe>
    </>
  );
};

export default VimeoEmbed;
