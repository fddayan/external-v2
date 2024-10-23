import React, { ReactNode, useContext } from "react";
import { navigate } from "gatsby";
import { logEvent } from "@src/utils/logClient";
import { Button } from "@src/components/nessie-web";
import { ModalContext, ModalType } from "@src/components/modals/ModalController";
import { getRelativePath } from "@src/utils/routes";

interface ButtonProps {
  eventName: string;
  path: string;
  children: ReactNode;
}

const ResourceDownloadButton: React.FC<ButtonProps> = ({ children, eventName, path }) => {
  const modalContext = useContext(ModalContext);
  // eslint-disable-next-line prefer-const

  let handleClick: (e: Event) => void;
  const handleYoutubeClick = (event: Event) => {
    event.preventDefault();
    const youtubeID = path.split("=")[1];
    logEvent(eventName);
    modalContext.showModal(ModalType.VideoModal, { youtubeID });
  };

  const handleAnchorClick = () => {
    logEvent(eventName);
  };

  const handleLinkClick = (event: Event) => {
    event.preventDefault();
    logEvent(eventName);
    navigate(getRelativePath(path));
  };

  if (path[0] === "/") {
    handleClick = handleLinkClick;
  } else if (path.indexOf("youtube.com/watch") > -1) {
    handleClick = handleYoutubeClick;
  } else {
    handleClick = handleAnchorClick;
  }

  return (
    <Button
      href={path}
      target="_blank"
      rel="noreferrer"
      onClick={(e: Event) => handleClick(e)}
      style={{ margin: "auto", width: "fit-content" }}
    >
      {children}
    </Button>
  );
};

export default ResourceDownloadButton;
