import React, { useContext, useState, useEffect } from "react";
import { Button } from "@src/components/nessie-web";
import styled from "@emotion/styled";
import Container from "@src/components/Container";
import { graphql, useStaticQuery } from "gatsby";
import { mediaQueries, mediaQueriesMax } from "@src/styles/theme";
import { ModalContext, ModalType } from "@src/components/modals/ModalController";
import CommonModal from "@src/components/modals/CommonModal";
import { Body1, Display3, DarkButton } from "./styles";
import { logEvent } from "@src/utils/logClient";

const GridContainer = styled(Container)`
  display: grid;
  text-align: center;
  grid-template-areas:
    "a"
    "b"
    "c"
    "d";

  ${mediaQueriesMax[1]} {
    grid-template-areas:
      "a"
      "d"
      "b"
      "c";
  }
`;
const ButtonContainer = styled.div`
  grid-area: "c";
  display: flex;
  justify-content: center;
  ${mediaQueriesMax[1]} {
    button {
      width: 100%;
    }
  }
`;
const UsageReport = () => {
  const data = useStaticQuery(graphql`
    {
      mapIllustration: file(relativePath: { eq: "districts/illustration-us-map.png" }) {
        publicURL
      }
      illustrationHeart: file(relativePath: { eq: "district-leader/illustration-heart.png" }) {
        publicURL
      }
    }
  `);

  const { illustrationHeart, mapIllustration } = data;
  const [showSuccess, setShowSuccess] = useState(false);

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
    modalContext.showModal(ModalType.DistrictsDownloadModal);
    logEvent({
      eventName: "web.external.districts.open_request_form",
      eventValue: window.location.href,
    });
  };

  return (
    <GridContainer
      css={{
        textAlign: "center",
        gap: 30,
        maxWidth: 800,
        paddingBlock: 48,
      }}
    >
      <Display3 css={{ gridArea: "a" }}>See the difference ClassDojo is making in your district</Display3>
      <Body1 css={{ gridArea: "b" }}>
        ClassDojo is already making a change in so many districts across the country. See what's happening in your
        district now.
      </Body1>
      <ButtonContainer>
        <DarkButton onClick={openDistrictForm}>Request report</DarkButton>
      </ButtonContainer>
      <img alt="Illustration" src={mapIllustration.publicURL} css={{ width: "100%", gridArea: "d" }} />

      {showSuccess && (
        <CommonModal closeModal={closeModal}>
          <p>
            Thanks! We’ll follow up with you via email as soon as possible. You can also reach out to{" "}
            <a href="mailto:districts@classdojo.com">districts@classdojo.com</a> with any other questions for our team.
          </p>
        </CommonModal>
      )}
    </GridContainer>
  );
};

export default UsageReport;
