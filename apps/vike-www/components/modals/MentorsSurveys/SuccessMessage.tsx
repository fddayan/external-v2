import React from "react";
import { Title } from "@src/components/nessie-web";
import Translate from "@src/components/translation/Translate";

const SuccessMessage = () => {
  return (
    <Title textAlign="center">
      <Translate path="directus.page_mentors_surveys.success_message" />
    </Title>
  );
};

export default SuccessMessage;
