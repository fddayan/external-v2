import React, { useState, useContext, FormEvent, ChangeEvent, useEffect } from "react";
import CommonModal from "../../CommonModal";
import { Subheading, Space, BodyText, Button, TextArea } from "@src/components/nessie-web";
import { MissionCompleteData, MultipleChoiceOption } from "../mentorsSurvey.model";
import { TranslationContext } from "@src/components/translation/TranslationContext";
import * as S from "../joinTheClub.style";
import { Grid } from "@src/components/Grid";
import { logEvent } from "@src/utils/logClient";
import SuccessMessage from "../SuccessMessage";

// const firstQuestionItems = ["1", "2", "3", "4", "5"] as const;
const firstQuestionItems = ["1", "2", "3"] as const;

const MissionCompleteModal = (props: { closeModal: () => void }) => {
  const [formSuccess, setFormSuccess] = useState(false);
  const [mcFormData, setMcFormData] = useState<MissionCompleteData>({
    question1: [],
    question2: "",
  });

  const t = useContext(TranslationContext);

  const question1IsValid = mcFormData.question1.length > 0;
  const question2IsValid = mcFormData.question2.length > 0;

  const formIsValid = question1IsValid && question2IsValid;

  const answers = {
    answer1: t.translate("directus.page_mentors_surveys.form_3_questions.answers_1.answer_1"),
    answer2: t.translate("directus.page_mentors_surveys.form_3_questions.answers_1.answer_2"),
    answer3: t.translate("directus.page_mentors_surveys.form_3_questions.answers_1.answer_3"),
    answer4: "",
    answer5: "",
    // answer4: t.translate("directus.page_mentors_surveys.form_3_questions.answers_1.answer_4"),
    // answer5: t.translate("directus.page_mentors_surveys.form_3_questions.answers_1.answer_5"),
  };

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const logData = {
      question1: mcFormData.question1.map((a) => answers[`answer${a}`]),
      question2: mcFormData.question2,
    };

    logEvent({
      eventValue: window.location.href,
      eventName: "web.external_page.mentors_page.mission_complete_form.submit",
      metadata: logData,
    });

    setFormSuccess(true);
    setTimeout(props.closeModal, 10000);
  }

  function handleCheckboxChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target as { name: "question1" | "question2"; value: MultipleChoiceOption };
    const currValue = mcFormData[name];
    let selectedAnswers: MultipleChoiceOption[] | string[] = Array.isArray(currValue) ? currValue : [currValue];

    if (mcFormData[name].indexOf(value) > -1 && Array.isArray(selectedAnswers)) {
      selectedAnswers = selectedAnswers.filter((i) => i !== value);
    } else {
      selectedAnswers.push(value);
    }
    const updatedFormData = {
      ...mcFormData,
      [name]: selectedAnswers,
    };

    setMcFormData(updatedFormData);
  }

  useEffect(() => {
    logEvent("web.external.mentors_page.mission_complete_modal.modal_open");
  }, []);

  return (
    <CommonModal
      {...props}
      noHeaderText={formSuccess}
      headerText={t.translate("directus.page_mentors_surveys.form_3_title")}
    >
      {formSuccess ? (
        <SuccessMessage />
      ) : (
        <>
          <Subheading>{t.translate("directus.page_mentors_surveys.form_3_headline")}</Subheading>
          <Space size="m" />
          <form onSubmit={(e) => handleSubmit(e)}>
            <BodyText>1. {t.translate("directus.page_mentors_surveys.form_3_questions.question_1")}</BodyText>
            <Space size="s" />
            <Grid columns={2}>
              {firstQuestionItems.map((number, i) => {
                return (
                  <div key={i}>
                    <input
                      name="question1"
                      type="checkbox"
                      value={number}
                      checked={mcFormData.question1.indexOf(number as MultipleChoiceOption) > -1}
                      id={`question1_answer${number}`}
                      onChange={(e) => handleCheckboxChange(e)}
                    />
                    <S.RadioLabel htmlFor={`question1_answer${number}`}>{answers[`answer${number}`]}</S.RadioLabel>
                  </div>
                );
              })}
            </Grid>
            <Space size="m" />
            <BodyText>2. {t.translate("directus.page_mentors_surveys.form_3_questions.question_2")}</BodyText>
            <Space size="s" />
            <TextArea
              name="question4"
              required
              onChange={(value: string) => setMcFormData({ ...mcFormData, question2: value })}
            />
            <Space size="m" />
            <Button kind="primary" type="submit" size="m" disabled={!formIsValid}>
              Submit
            </Button>
          </form>
        </>
      )}
    </CommonModal>
  );
};

export default MissionCompleteModal;
