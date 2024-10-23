import React, { useContext, useState, useEffect } from "react";
import Container from "@src/components/Container";
import {
  Caption,
  Headline1,
  PurpleBox,
  Blockquote,
  Display1,
  Icon,
  Card,
  CardContainer,
} from "./styles";
import { Button } from "@src/components/nessie-web";
import Translate from "@src/components/translation/Translate";
import { logEvent } from "@src/utils/logClient";
import CommonModal from "@src/components/modals/CommonModal";
import {
  ModalContext,
  ModalType,
} from "@src/components/modals/ModalController";
import ReactMarkdown from "react-markdown";
import { TranslationContext } from "@src/components/translation/TranslationContext";
import { Carret } from "@src/components/partials/schoolleader/styles";

const GetStarted = ({ cards }) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const t = useContext(TranslationContext);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("success") !== null) {
      setShowSuccess(true);
      logEvent({
        eventName: "web.external.districts.show_report_success",
        eventValue: window.location.href,
      });
    }
  }, []);

  const closeModal = () => {
    setShowSuccess(false);
    const url = new URL(window.location.href);
    if (url.searchParams.has("success")) {
      url.searchParams.delete("success");
      window.history.pushState({}, "", url);
    }
  };

  const modalContext = useContext(ModalContext);
  const openDistrictForm = () => {
    modalContext.showModal(ModalType.SchoolsLeadGenModal);
    logEvent({
      eventName: "web.external.districts.open_request_form",
      eventValue: window.location.href,
    });
  };

  return (
    <Container marginBottom={80}>
      <Display1 css={{ textAlign: "center", marginBottom: 78 }}>
        <ReactMarkdown>
          {t
            .translate("directus.page_schoolleader_2024.get_started_heading")
            .toString()}
        </ReactMarkdown>
      </Display1>
      <CardContainer>
        {cards.map((card, index) => (
          <Card
            key={index}
            href={card.cta_url}
            className={card.show_cta && "interactive"}
            onClick={() => {
              card.cta_url === "#request" && openDistrictForm();
            }}
          >
            <Icon icon={card.icon} />
            <Headline1 css={{ flexGrow: 1 }}>{card.heading}</Headline1>

            {card.show_cta && (
              <div>
                <span>{card.cta_text}</span>
                <Carret />
              </div>
            )}
          </Card>
        ))}
      </CardContainer>
      {showSuccess && (
        <CommonModal closeModal={closeModal}>
          <p>
            Thanks! We’ll follow up with you via email as soon as possible. You
            can also reach out to{" "}
            <a href="mailto:schools@classdojo.com">schools@classdojo.com</a>{" "}
            with any other questions for our team.
          </p>
        </CommonModal>
      )}
    </Container>
  );
};

export default GetStarted;
