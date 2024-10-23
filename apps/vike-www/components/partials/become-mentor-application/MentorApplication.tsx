import React, { useContext, useState, FormEvent, useEffect } from "react";
import { TranslationContext } from "@src/components/translation/TranslationContext";
import { Space, Subheading, BodyText, TextField, TextArea, Caption, Button } from "@src/components/nessie-web";
import { logEvent } from "@src/utils/logClient";
import { useStaticQuery, graphql } from "gatsby";
import { AppDataContext } from "@src/components/AppDataContext";
import { Select, StyledForm } from "@src/components/modals/MentorsSurveys/joinTheClub.style";
import { mapValues, size } from "lodash";
import { LocalStorageWrapper } from "@src/utils/localStorage";
import { entries, filter, pipe } from "lodash/fp";

const maxAllowedBirthDate = new Date(new Date().setFullYear(new Date().getFullYear() - 13));
const maxAllowedBirthDateString = `${maxAllowedBirthDate.getFullYear()}-${maxAllowedBirthDate
  .getUTCMonth()
  .toString()
  .padStart(2, "0")}-${maxAllowedBirthDate.getUTCDay().toString().padStart(2, "0")}`;

const JTC_FORM_DATA_DEFAULT = {
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
};

type JtcFormData = typeof JTC_FORM_DATA_DEFAULT;

const useTrackForm = (data: JtcFormData) => {
  const [tracked, setTracked] = useState<Record<string, boolean>>({});
  const values = mapValues(data, size);
  // const completed = filter(entries(values), ([key, value]) => key !== "question3" && value > 50);
  const completed = pipe(
    entries,
    filter(([key, value]) => key !== "question3" && value > 50),
    filter(([key]) => !tracked[key]),
  )(values);

  useEffect(() => {
    completed.forEach(([key]) => setTracked((prev) => ({ ...prev, [key]: true })));
  }, [completed]);

  useEffect(() => {
    completed.forEach(([key]) => {
      logEvent({
        eventValue: window.location.href,
        eventName: `web.external_page.become_mentor_application.join_the_club_form.${key}.complete`,
      });
    });
  }, [completed]);
};

const useJtcFormData = () => {
  const key = "mentorApplicationData";
  const [state, setState] = useState<JtcFormData>(() => {
    const savedData = LocalStorageWrapper.getItem(key);

    return savedData ? JSON.parse(savedData) : JTC_FORM_DATA_DEFAULT;
  });

  useEffect(() => {
    LocalStorageWrapper.setItem(key, JSON.stringify(state));
  }, [state]);

  return [state, setState] as const;
};

const useHandleSubmit = () => {
  const [completed, setCompleted] = useState(false);
  const { services } = useContext(AppDataContext);
  const t = useContext(TranslationContext);

  const [jtcFormData, setJtcFormData] = useJtcFormData();

  async function handleSubmit(ev: FormEvent) {
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
    await services.applyToBeMentor(payload);

    setCompleted(true);

    logEvent({
      eventValue: window.location.href,
      eventName: "web.external_page.become_mentor_application.join_the_club_form.submit",
      metadata: payload,
    });
    // setTimeout(props.closeModal, 10000);
  }

  return {
    jtcFormData,
    setJtcFormData,
    handleSubmit,
    completed,
  };
};

const useGetMentorApplicationData = () => {
  return useStaticQuery(graphql`
    query {
      directus {
        page_mentors_surveys {
          new_form_1_headline_link_url
        }
      }
    }
  `);
};

const MentorApplication = () => {
  const {
    directus: {
      page_mentors_surveys: { new_form_1_headline_link_url },
    },
  } = useGetMentorApplicationData();
  const t = useContext(TranslationContext);
  const { data: appData } = useContext(AppDataContext);
  const [userDataLoaded, setUserDataLoaded] = useState(false);
  const { jtcFormData, setJtcFormData, handleSubmit } = useHandleSubmit();
  useTrackForm(jtcFormData);

  useEffect(() => {
    logEvent("web.external_page.become_mentor_application.join_the_club_modal.modal_open");
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
    // NOTE: DO NOT add setJtcFormData and jtcFormData to the dependencies array. This will cause an infinite loop.
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            value={jtcFormData.describeYourself}
            onChange={(value: string) => setJtcFormData({ ...jtcFormData, describeYourself: value })}
          />
        </div>
        <Space size="m" />
        <div>
          <Subheading>{t.translate("directus.page_mentors_surveys.Importance_working_together")}</Subheading>
          <Space size="xs" />
          <TextArea
            name="importanceWorkingTogether"
            required
            value={jtcFormData.importanceWorkingTogether}
            onChange={(value: string) => setJtcFormData({ ...jtcFormData, importanceWorkingTogether: value })}
          />
        </div>
        <Space size="m" />
        <div>
          <Subheading>{t.translate("directus.page_mentors_surveys.Collaboration")}</Subheading>
          <Space size="xs" />
          <TextArea
            name="tellUsCollaboration"
            required
            value={jtcFormData.tellUsCollaboration}
            onChange={(value: string) => setJtcFormData({ ...jtcFormData, tellUsCollaboration: value })}
          />
        </div>
        <Space size="m" />
        <div>
          <Subheading>{t.translate("directus.page_mentors_surveys.Describe_ClassDojo")}</Subheading>
          <Space size="xs" />
          <TextArea
            name="describeClassDojo"
            required
            value={jtcFormData.describeClassDojo}
            onChange={(value: string) => setJtcFormData({ ...jtcFormData, describeClassDojo: value })}
          />
        </div>
        <Space size="m" />
        <div>
          <Subheading>{t.translate("directus.page_mentors_surveys.Why_excited_to_be_mentor")}</Subheading>{" "}
          {/* New question */}
          <Space size="xs" />
          <TextArea
            name="whyExcitedToBeMentor"
            required
            value={jtcFormData.whyExcitedToBeMentor}
            onChange={(value: string) => setJtcFormData({ ...jtcFormData, whyExcitedToBeMentor: value })}
          />
        </div>
        <Space size="m" />
        <div>
          <Subheading>{t.translate("directus.page_mentors_surveys.First_action_as_mentor")}</Subheading>
          <Space size="xs" />
          <TextArea
            name="firstActionAsMentor"
            required
            value={jtcFormData.firstActionAsMentor}
            onChange={(value: string) => setJtcFormData({ ...jtcFormData, firstActionAsMentor: value })}
          />
        </div>
        <Space size="m" />
        <Button kind="primary" type="submit" size="m">
          {t.translate("directus.page_mentors_surveys.new_form_1_submit_label")}
        </Button>
      </StyledForm>
    </>
  );
};

export default MentorApplication;
