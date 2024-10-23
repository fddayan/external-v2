import React, { useContext, useEffect } from "react";
import CommonModal from "@src/components/modals/CommonModal";
import { TranslationContext } from "@src/components/translation/TranslationContext";
import MentorApplication from "./MentorApplication";
import IneligibleToBeMentor from "./IneligibleToBeMentor";
import { AppDataContext } from "@src/components/AppDataContext";
import SuccessMessage from "../SuccessMessage";

const JoinTheClubModal = (props: { closeModal: () => void }) => {
  const t = useContext(TranslationContext);
  const appData = useContext(AppDataContext);

  useEffect(() => {
    if (appData.data.userData && !appData.data.mentorApplicationEligibility) {
      appData.services.getMentorApplicationEligibility();
    }
  }, [appData.data, appData.services]);

  if (!appData.data.mentorApplicationEligibility) {
    return null;
  }

  let modalComponent;
  let titleCopy;
  if (appData.data.mentorApplicationEligibility.isEligible) {
    modalComponent = <MentorApplication closeModal={props.closeModal} />;
    titleCopy = t.translate("directus.page_mentors_surveys.almost_there");
  } else if (appData.data.mentorApplicationEligibility.applied) {
    modalComponent = <SuccessMessage />;
  } else {
    modalComponent = (
      <IneligibleToBeMentor
        closeModal={props.closeModal}
        reason={appData.data.mentorApplicationEligibility.reason}
        mentors={appData.data.mentorApplicationEligibility.mentors}
      />
    );

    titleCopy =
      appData.data.mentorApplicationEligibility.reason === "Teacher is already a mentor"
        ? t.translate("directus.page_mentors_surveys.already_mentor_title")
        : t.translate("directus.page_mentors_surveys.almost_there");
  }

  return (
    <CommonModal
      headerText={titleCopy}
      {...props}
      modalDialogStyle={{
        padding: "30px",
        width: "fit-content",
        textAlign: "center",
      }}
    >
      {modalComponent}
    </CommonModal>
  );
};

export default JoinTheClubModal;
