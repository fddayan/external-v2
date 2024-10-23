import React, { useContext, useState, FormEvent, useEffect } from "react";
import { JoinTheClubData } from "../mentorsSurvey.model";
import { TranslationContext } from "@src/components/translation/TranslationContext";
import { Button, Space, Subheading, BodyText, TextField, TextArea, Caption } from "@src/components/nessie-web";
import { StyledForm, CheckboxContainer, Select } from "../joinTheClub.style";
import { logEvent } from "@src/utils/logClient";
import { useStaticQuery, graphql } from "gatsby";
import { AppDataContext } from "@src/components/AppDataContext";
import { isNil, omitBy } from "lodash";

const maxAllowedBirthDate = new Date(new Date().setFullYear(new Date().getFullYear() - 13));
const maxAllowedBirthDateString = `${maxAllowedBirthDate.getFullYear()}-${maxAllowedBirthDate
  .getUTCMonth()
  .toString()
  .padStart(2, "0")}-${maxAllowedBirthDate.getUTCDay().toString().padStart(2, "0")}`;

const JoinTheClubModal = (props: { closeModal: () => void }) => {
  const {
    directus: {
      page_mentors_surveys: { new_form_1_headline_link_url },
    },
  } = useStaticQuery(graphql`
    query {
      directus {
        page_mentors_surveys {
          new_form_1_headline_link_url
        }
      }
    }
  `);
  const questions = {
    howManyTeachers: "How many teachers are there at your school?",
    describeYourself:
      "Please describe yourself as a teacher - in particular, what aspect of your teaching style makes you the most proud?",
    importanceWorkingTogether:
      "How important is it for teachers, families, and administrators to work together? Please explain the “why” behind your answer?",
    tellUsCollaboration:
      "Tell us about a time you shared or collaborated with another teacher or administrator (or both!) at your school.",
    describeClassDojo: "How would you describe ClassDojo to another teacher?",
    firstActionAsMentor: "If you become a Mentor, what are you most excited to do first?",
    whyExcitedToBeMentor: "Why are you excited to become a Mentor?",
  };
  const t = useContext(TranslationContext);
  const { data: appData, services } = useContext(AppDataContext);
  const [userDataLoaded, setUserDataLoaded] = useState(false);
  const [jtcFormData, setJtcFormData] = useState({
    question1: "",
    question2: "",
    question3: null,
    question4: "",
    howManyTeachers: "",
    describeYourself: "",
    importanceWorkingTogether: "",
    tellUsCollaboration: "",
    describeClassDojo: "",
    firstActionAsMentor: "",
    whyExcitedToBeMentor: "",
  });

  function handleSubmit(ev: FormEvent) {
    ev.preventDefault();

    // Prepare questions for payload
    const questionsPayload = [
      {
        questionText: t.translate("directus.page_mentors_surveys.How_many_teachers"),
        answer: jtcFormData.howManyTeachers,
      },
      {
        questionText: t.translate("directus.page_mentors_surveys.Describe_yourself"),
        answer: jtcFormData.describeYourself,
      },
      {
        questionText: t.translate("directus.page_mentors_surveys.Importance_working_together"),
        answer: jtcFormData.importanceWorkingTogether,
      },
      {
        questionText: t.translate("directus.page_mentors_surveys.Collaboration"),
        answer: jtcFormData.tellUsCollaboration,
      },
      {
        questionText: t.translate("directus.page_mentors_surveys.Describe_ClassDojo"),
        answer: jtcFormData.describeClassDojo,
      },
      {
        questionText: t.translate("directus.page_mentors_surveys.First_action_as_mentor"),
        answer: jtcFormData.firstActionAsMentor,
      },
      {
        questionText: t.translate("directus.page_mentors_surveys.Why_excited_to_be_mentor"), // Translation key for new question
        answer: jtcFormData.whyExcitedToBeMentor,
      },
    ];

    const payload = {
      birthday: jtcFormData.question3,
      intentions: jtcFormData.question4,
      agreement: true,
      questions: questionsPayload,
      status: "pending",
    };

    // Call the backend API to submit the application (assuming services.applyToBeMentor is set up for this)
    services.applyToBeMentor(payload);

    logEvent({
      eventValue: window.location.href,
      eventName: "web.external_page.mentors_page.join_the_club_form.submit",
      metadata: payload,
    });
    setTimeout(props.closeModal, 10000);
  }

  useEffect(() => {
    logEvent("web.external.mentors_page.join_the_club_modal.modal_open");
  }, []);

  useEffect(() => {
    if (appData.type && appData.userData) {
      const { firstName, lastName, emailAddress } = appData.userData;
      setJtcFormData({
        ...jtcFormData,
        question1: `${firstName} ${lastName}`,
        question2: emailAddress ?? "",
      });
      setUserDataLoaded(true);
    }
  }, [appData]);

  return (
    <>
      <BodyText>
        {t.translate("directus.page_mentors_surveys.new_form_1_headline_1")}{" "}
        <a href={new_form_1_headline_link_url} target="_blank" rel="noreferrer">
          {t.translate("directus.page_mentors_surveys.new_form_1_headline_link_text")}
        </a>
      </BodyText>
      <Space size="m" />
      <StyledForm onSubmit={(e) => handleSubmit(e)}>
        <Space size="m" />
        <div>
          <Subheading>{t.translate("directus.page_mentors_surveys.new_form_1_questions.question_1")}</Subheading>
          <Space size="xs" />
          <TextField
            type="text"
            required
            disabled={userDataLoaded}
            name="question1"
            value={jtcFormData.question1}
            onChange={(value: string) => setJtcFormData({ ...jtcFormData, question1: value })}
          />
        </div>
        <Space size="m" />
        <div>
          <Subheading>{t.translate("directus.page_mentors_surveys.new_form_1_questions.question_2")}</Subheading>
          <Space size="xs" />
          <TextField
            type="email"
            required
            disabled={userDataLoaded}
            name="question2"
            value={jtcFormData.question2}
            onChange={(value: string) => setJtcFormData({ ...jtcFormData, question2: value })}
          />
        </div>
        <Space size="m" />
        <div>
          <Subheading>{t.translate("directus.page_mentors_surveys.new_form_1_questions.question_3")}</Subheading>
          <Space size="xs" />
          <TextField
            type="date"
            required
            name="question3"
            onChange={(value: Date) => setJtcFormData({ ...jtcFormData, question3: value })}
            max={maxAllowedBirthDateString}
          />
        </div>
        <Space size="m" />
        <div>
          <Subheading>{t.translate("directus.page_mentors_surveys.How_many_teachers")}</Subheading>
          <Space size="xs" />
          <Select
            required
            name="howManyTeachers"
            value={jtcFormData.howManyTeachers}
            onChange={(e) => setJtcFormData({ ...jtcFormData, howManyTeachers: e.target.value })}
          >
            <option value="">Select number of teachers</option>
            <option value="1-30">1-30</option>
            <option value="30-60">30-60</option>
            <option value="60-120">60-120</option>
            <option value="120+">120+</option>
          </Select>
        </div>
        <Space size="m" />
        <div>
          <Subheading>{t.translate("directus.page_mentors_surveys.Describe_yourself")}</Subheading>
          <Space size="xs" />
          <TextArea
            name="describeYourself"
            required
            minlength="50"
            onChange={(value: string) => setJtcFormData({ ...jtcFormData, describeYourself: value })}
          />
          <Caption kind="inactive">Minimum 50 characters</Caption>
        </div>
        <Space size="m" />
        <div>
          <Subheading>{t.translate("directus.page_mentors_surveys.Importance_working_together")}</Subheading>
          <Space size="xs" />
          <TextArea
            name="importanceWorkingTogether"
            required
            minlength="50"
            onChange={(value: string) => setJtcFormData({ ...jtcFormData, importanceWorkingTogether: value })}
          />
          <Caption kind="inactive">Minimum 50 characters</Caption>
        </div>
        <Space size="m" />
        <div>
          <Subheading>{t.translate("directus.page_mentors_surveys.Collaboration")}</Subheading>
          <Space size="xs" />
          <TextArea
            name="tellUsCollaboration"
            required
            minlength="50"
            onChange={(value: string) => setJtcFormData({ ...jtcFormData, tellUsCollaboration: value })}
          />
          <Caption kind="inactive">Minimum 50 characters</Caption>
        </div>
        <Space size="m" />
        <div>
          <Subheading>{t.translate("directus.page_mentors_surveys.Describe_ClassDojo")}</Subheading>
          <Space size="xs" />
          <TextArea
            name="describeClassDojo"
            required
            minlength="50"
            onChange={(value: string) => setJtcFormData({ ...jtcFormData, describeClassDojo: value })}
          />
          <Caption kind="inactive">Minimum 50 characters</Caption>
        </div>
        <Space size="m" />
        <div>
          <Subheading>{t.translate("directus.page_mentors_surveys.Why_excited_to_be_mentor")}</Subheading>{" "}
          {/* New question */}
          <Space size="xs" />
          <TextArea
            name="whyExcitedToBeMentor"
            required
            minlength="50"
            onChange={(value: string) => setJtcFormData({ ...jtcFormData, whyExcitedToBeMentor: value })}
          />
          <Caption kind="inactive">Minimum 50 characters</Caption>
        </div>
        <Space size="m" />
        <div>
          <Subheading>{t.translate("directus.page_mentors_surveys.First_action_as_mentor")}</Subheading>
          <Space size="xs" />
          <TextArea
            name="firstActionAsMentor"
            required
            minlength="50"
            onChange={(value: string) => setJtcFormData({ ...jtcFormData, firstActionAsMentor: value })}
          />
          <Caption kind="inactive">Minimum 50 characters</Caption>
        </div>
        <Space size="m" />
        <Button kind="primary" type="submit" size="m">
          {t.translate("directus.page_mentors_surveys.new_form_1_submit_label")}
        </Button>
      </StyledForm>
    </>
  );
};

export default JoinTheClubModal;
