import React, { useState, createContext, useContext } from "react";
import { ModalContext, ModalType } from "@src/components/modals/ModalController";

const VideoGridContext = createContext({
  openVideoContainer: null,
  closeVideoContainer: null,
  openSubscriptionModal: null,
  videoContainerActiveIndex: null,
  activeVideoData: null,
  isVideoContainerShow: null,
});

export const VideoGridProvider = ({ children, setVideoContent }) => {
  const [isVideoContainerShow, setVideoContainerShow] = useState(false);
  const [videoContainerActiveIndex, setVideoContainerActiveIndex] = useState(null);
  const [activeVideoData, setActiveVideo] = useState({
    url: "",
    image: "",
    order: "",
  });

  const { showModal } = React.useContext(ModalContext);
  const openSubscriptionModal = (modalData: { label: string; sendGridId: string }) =>
    showModal(ModalType.SendgridModal, modalData);

  function closeVideoContainer() {
    setVideoContainerShow(false);
    setVideoContainerActiveIndex(null);
    history.replaceState(null, null, " ");
  }

  function openVideoContainer({ url, image, index, videoPreview }) {
    setActiveVideo({
      url,
      image,
      order: index,
    });
    setVideoContent(videoPreview);
    setVideoContainerActiveIndex(index);
    setVideoContainerShow(true);
  }

  const contextValue = {
    openVideoContainer,
    closeVideoContainer,
    openSubscriptionModal,
    videoContainerActiveIndex,
    activeVideoData,
    isVideoContainerShow,
  };
  return <VideoGridContext.Provider value={contextValue}>{children}</VideoGridContext.Provider>;
};

export function useVideoGrid() {
  const context = useContext(VideoGridContext);
  if (!context) throw new Error("useVideoGrid must be used within a VideoGrid component");
  const {
    openVideoContainer,
    closeVideoContainer,
    openSubscriptionModal,
    videoContainerActiveIndex,
    activeVideoData,
    isVideoContainerShow,
  } = context;
  return {
    openVideoContainer,
    closeVideoContainer,
    openSubscriptionModal,
    videoContainerActiveIndex,
    activeVideoData,
    isVideoContainerShow,
  };
}
