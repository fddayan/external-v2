import React, { useEffect, useRef, useState, useContext, useCallback, ReactNode } from "react";
import Container from "@src/components/Container";
import { Button } from "@src/components/nessie-web";
import { ModalContext, ModalType } from "@src/components/modals/ModalController";
import { LinkButton, CurvedContainer, Display1 } from "./styles";
import { logEvent } from "@src/utils/logClient";
import {
  BulletNavigation,
  Bullet,
  ImageContainer,
  PanelContainer,
  Panel,
  MobileCTAContainer,
} from "./StickyCarousel.styles";

export interface StickyContent {
  imageSrc: string;
  mobileSrc: string;
  detail_text: string;
  heading: string;
  paragraph: string;
}

export interface StickyTextSlots {
  carousel_primary_cta_copy: ReactNode;
  carousel_secondary_cta_copy: ReactNode;
}

export interface StickyCarouselProps<T> {
  openCalendly: (id: string) => void;
  content: T[];
  textSlots: StickyTextSlots;
  renderContent: (content: T, index: number) => ReactNode;
  renderImage: (content: T, index: number, activePanel: number) => ReactNode;
}

const StickyCarousel = <T,>({
  content,
  openCalendly,
  textSlots,
  renderContent,
  renderImage,
}: StickyCarouselProps<T>) => {
  const [activePanel, setActivePanel] = useState(0);
  const panelRefs = useRef(content.map(() => React.createRef<any>()));
  const panelContainerRef = useRef(null);
  const { carousel_primary_cta_copy, carousel_secondary_cta_copy } = textSlots;

  // const modalContext = useContext(ModalContext);
  // function openSignupModal() {
  //   logEvent({
  //     eventName: "teacher.classdojo_school.open_signup.sticky",
  //   });
  //   modalContext.showModal(ModalType.Signup);
  // }

  const scrollToPanel = useCallback(
    (index) => {
      if (index >= 0 && index < content.length) {
        panelRefs.current[index]?.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    },
    [content.length],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = panelRefs.current.findIndex((ref) => ref.current === entry.target);
            if (index !== -1) setActivePanel(index);
          }
        });
      },
      { threshold: 0.5 },
    );

    panelRefs.current.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => panelRefs.current.forEach((ref) => ref.current && observer.unobserve(ref.current));
  }, [content]);

  useEffect(() => {
    if (panelContainerRef.current) {
      let styleAdded = false;

      const containerObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.intersectionRatio >= 0.8 && !styleAdded) {
            document.documentElement.style.scrollSnapType = "y mandatory";
            styleAdded = true;
          } else if (entry.intersectionRatio < 1 && styleAdded) {
            document.documentElement.style.scrollSnapType = "";
            styleAdded = false;
          }
        },
        {
          threshold: [0, 0.8, 1],
        },
      );

      containerObserver.observe(panelContainerRef.current);

      return () => {
        containerObserver.unobserve(panelContainerRef.current);
        document.documentElement.style.scrollSnapType = "";
      };
    }
  }, []);

  return (
    <CurvedContainer>
      <Container css={{ maxWidth: 1000 }}>
        <BulletNavigation ref={panelContainerRef}>
          {content.map((_, index) => (
            <Bullet key={index} active={index === activePanel} onClick={() => scrollToPanel(index)} />
          ))}
        </BulletNavigation>
        <ImageContainer>{content.map((panel, index) => renderImage(panel, index, activePanel))}</ImageContainer>
        <PanelContainer>
          {content.map((panel, index) => (
            <Panel key={index} ref={panelRefs.current[index]}>
              {renderContent(panel, index)}
            </Panel>
          ))}
        </PanelContainer>
      </Container>
    </CurvedContainer>
  );
};
export default StickyCarousel;
