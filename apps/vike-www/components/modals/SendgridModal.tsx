import React from "react";
import styled from "@emotion/styled";
import { Modal, ModalContent, ModalCloseButton } from "@src/components/nessie-web";
import SubscriptionForm from "@src/components/partials/shared/SubscriptionForm";

const ModalContentInner = styled.div`
  padding: 36px;
`;

type Props = {
  label: string;
  sendGridId: string;
  closeModal: () => void;
};
const VideoModal = ({ label, sendGridId, closeModal }: Props) => {
  return (
    <Modal isOpen={true}>
      <ModalContent>
        <ModalCloseButton right onClick={closeModal} />
        <ModalContentInner>
          <SubscriptionForm
            btn={{
              label: "I'm in!",
            }}
            sendGridId={sendGridId}
            label={label}
          />
        </ModalContentInner>
      </ModalContent>
    </Modal>
  );
};

export default VideoModal;
