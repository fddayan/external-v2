import React from "react";
import Container from "@src/components/Container";
import { Display4, Headline2 } from "../schoolleader/styles";
import { Button } from "@src/components/nessie-web";
import { mediaQueriesMax } from "@src/styles/theme";
import Translate from "@src/components/translation/Translate";
import { logEvent } from "@src/utils/logClient";

const SchoolwidePointsForm = ({ setShowFormModal }) => {
  const openModal = () => {
    setShowFormModal(true);
    logEvent("web.external.schoolwide_points.open_form.click");
  };

  return (
    <div css={{ backgroundColor: "#D2ECFF" }}>
      <Container
        css={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 24,
          paddingBlock: 48,
        }}
      >
        <Display4>
          <Translate path="directus.page_schoolwide_points.form_section_title" />
        </Display4>
        <Headline2>
          <Translate path="directus.page_schoolwide_points.form_section_subtitle" />
        </Headline2>
        <Button kind="plus" onClick={openModal}>
          <Translate path="directus.page_schoolwide_points.form_section_cta" />
        </Button>
      </Container>
    </div>
  );
};

export default SchoolwidePointsForm;
