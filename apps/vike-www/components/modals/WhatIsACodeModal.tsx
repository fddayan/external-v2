import React, { useContext } from "react";
import CommonModal, { CommonModalProps } from "./CommonModal";
import { Text } from "@src/components/Text";
import { ModalContext, ModalType } from "@src/components/modals/ModalController";
import Button from "@src/components/Button";
import { Box, Flex } from "@src/components/Boxes";
import { TranslationContext } from "@src/components/translation/TranslationContext";

const WhatIsACodeModal = (props: CommonModalProps) => {
  const t = useContext(TranslationContext);
  const modalContext = useContext(ModalContext);

  function showParentSignup() {
    modalContext.showModal(ModalType.ParentSignup);
  }

  return (
    <CommonModal headerText={t.translate("code_explanation.title")} {...props}>
      <Box width={"100%"} textAlign="left">
        <Text>{t.translate("code_explanation.line_1")}</Text>
        <Text>{t.translate("code_explanation.line_2")}</Text>
        <Flex alignItems="center" justifyContent="center">
          <Button big onClick={showParentSignup} my={"10px"}>
            {t.translate("code_explanation.ok")}
          </Button>
        </Flex>
      </Box>
    </CommonModal>
  );
};

export default WhatIsACodeModal;
