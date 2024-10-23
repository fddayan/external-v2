import React, { useContext, useEffect } from "react";
import { BodyText, Button, Space } from "@src/components/nessie-web";
import { TranslationContext } from "@src/components/translation/TranslationContext";
import Translate from "@src/components/translation/Translate";
import styled from "@emotion/styled";
import { logEvent } from "@src/utils/logClient";

const IneligibleWrapper = styled.div`
  max-width: 400px;
`;

const DismissButton = (props: { closeModal: () => void; gotIt?: boolean }) => {
  const t = useContext(TranslationContext);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center", paddingTop: "18px" }}>
        <Button kind="tertiary" type="href" size="l" onClick={props.closeModal} style={{ width: "100%" }}>
          {props.gotIt
            ? t.translate("directus.page_mentors_surveys.got_it")
            : t.translate("directus.page_mentors_surveys.not_now")}
        </Button>
      </div>
    </>
  );
};

const IneligibleToBeMentor = (props: {
  closeModal: () => void;
  reason: string;
  mentors?: { teacherId: string; name: string; emailAddress: string }[];
}): React.ReactElement => {
  useEffect(() => {
    logEvent({ eventName: "web.external.mentor_application.ineligible", eventValue: props.reason });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const t = useContext(TranslationContext);

  if (props.reason === "User is not a teacher") {
    return (
      <IneligibleWrapper>
        <BodyText>{t.translate("directus.page_mentors_surveys.error_parent")}</BodyText>
        <DismissButton closeModal={props.closeModal} gotIt />
      </IneligibleWrapper>
    );
  }

  if (props.reason === "Teacher is not in a school") {
    return (
      <IneligibleWrapper>
        <BodyText>{t.translate("directus.page_mentors_surveys.error_no_school")}</BodyText>
        <Space size="xl" />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            kind="primary"
            type="href"
            size="m"
            href="https://classdojo.zendesk.com/hc/en-us/articles/204365159-Join-Your-School#web"
            style={{ width: "fit-content" }}
          >
            {t.translate("directus.page_mentors_surveys.learn_how")}
          </Button>
        </div>
        <DismissButton closeModal={props.closeModal} />
      </IneligibleWrapper>
    );
  }

  if (props.reason === "Teacher is not in verified in their school") {
    return (
      <IneligibleWrapper>
        <BodyText>{t.translate("directus.page_mentors_surveys.error_not_school_verified")}</BodyText>
        <Space size="xl" />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            kind="primary"
            type="href"
            size="l"
            href="https://classdojo.zendesk.com/hc/en-us/articles/6374412254989-How-do-I-verify-my-Teacher-Account-#:~:text=Auto%2Dverification%3A%20Sign%20up%20using,account%20will%20automatically%20be%20verified."
            style={{ width: "100%" }}
          >
            {t.translate("directus.page_mentors_surveys.learn_how")}
          </Button>
        </div>
        <DismissButton closeModal={props.closeModal} />
      </IneligibleWrapper>
    );
  }

  if (props.reason === "Teacher is not email verified") {
    return (
      <IneligibleWrapper>
        <BodyText>{t.translate("directus.page_mentors_surveys.error_not_email_verified")}</BodyText>
        <DismissButton closeModal={props.closeModal} gotIt />
      </IneligibleWrapper>
    );
  }

  if (props.reason === "Teacher is school leader") {
    return (
      <IneligibleWrapper>
        <BodyText>{t.translate("directus.page_mentors_surveys.error_school_leader")}</BodyText>
        <DismissButton closeModal={props.closeModal} gotIt />
      </IneligibleWrapper>
    );
  }

  if (props.reason === "School already has 3+ mentors") {
    return (
      <IneligibleWrapper>
        <BodyText>{t.translate("directus.page_mentors_surveys.error_too_many_mentors")}</BodyText>
        <Space size="m" />
        {props.mentors && props.mentors.length ? (
          <BodyText>{t.translate("directus.page_mentors_surveys.current_mentors")}</BodyText>
        ) : null}
        <Space size="m" />
        {(props.mentors || []).map((mentor) => (
          <div key={mentor.teacherId}>
            <div>
              <BodyText>
                {mentor.name} ({mentor.emailAddress})
              </BodyText>
            </div>
          </div>
        ))}
        <DismissButton closeModal={props.closeModal} gotIt />
      </IneligibleWrapper>
    );
  }

  if (props.reason === "User has an existing mentor application") {
    return (
      <IneligibleWrapper>
        <BodyText>{t.translate("directus.page_mentors_surveys.error_existing_application")}</BodyText>
        <DismissButton closeModal={props.closeModal} gotIt />
      </IneligibleWrapper>
    );
  }

  if (props.reason === "Teacher is already a mentor") {
    return (
      <IneligibleWrapper>
        <BodyText>{t.translate("directus.page_mentors_surveys.already_mentor")}</BodyText>
        <DismissButton closeModal={props.closeModal} gotIt />
      </IneligibleWrapper>
    );
  }

  return (
    <IneligibleWrapper>
      <Translate path="codes.oops.try_again" />
    </IneligibleWrapper>
  );
};

export default IneligibleToBeMentor;
