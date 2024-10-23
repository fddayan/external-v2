import React, { useState, useContext, FormEvent, ChangeEvent, useEffect } from "react";
import AddressForm, { validateAddressData } from "@src/components/forms/AddressForm";
import CommonModal from "../../CommonModal";
import { Subheading, Space, BodyText, Button, TextField } from "@src/components/nessie-web";
import { MultipleChoiceOption, AcceptMissionData } from "../mentorsSurvey.model";
import { TranslationContext } from "@src/components/translation/TranslationContext";
import * as S from "../joinTheClub.style";
import { Address } from "@src/components/forms/AddressForm/addressForm.model";
import { logEvent } from "@src/utils/logClient";
import SuccessMessage from "../SuccessMessage";

const question2InitialValue = new Date();

const AcceptMissionModal = (props: { closeModal: () => void }) => {
  const [formSuccess, setFormSuccess] = useState(false);
  const [amFormData, setAmFormData] = useState<AcceptMissionData>({
    question1: null,
    // question2: question2InitialValue,
    // question3: {
    //   name: "",
    //   company: "",
    //   address1: "",
    //   address2: "",
    //   city: "",
    //   state: "",
    //   zip: "",
    //   country: "",
    //   email: "",
    //   phone: "",
    // },
  });

  const t = useContext(TranslationContext);

  const question1IsValid = amFormData.question1 !== null;
  // const question2IsValid = amFormData.question2 !== question2InitialValue;
  // const question3IsValid = validateAddressData(amFormData.question3);

  const formIsValid = question1IsValid;

  const answers = {
    answer1: t.translate("directus.page_mentors_surveys.form_2_questions.answers_1.answer_1"),
    answer2: t.translate("directus.page_mentors_surveys.form_2_questions.answers_1.answer_2"),
    answer3: t.translate("directus.page_mentors_surveys.form_2_questions.answers_1.answer_3"),
    // answer4: t.translate("directus.page_mentors_surveys.form_2_questions.answers_1.answer_4"),
  } as const;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const logData = {
      question1: answers[`answer${amFormData.question1}` as keyof typeof answers],
      // question2: amFormData.question2,
      // question3: amFormData.question3,
    };

    logEvent({
      eventValue: window.location.href,
      eventName: "web.external_page.mentors_page.accept_mission_form.submit",
      metadata: logData,
    });

    setFormSuccess(true);
    setTimeout(props.closeModal, 3000);
  }

  function handleRadioChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    const updatedFormData = {
      ...amFormData,
      [name]: value,
    };

    setAmFormData(updatedFormData);
  }

  // function handleAddressChange(address: Address) {
  //   setAmFormData({
  //     ...amFormData,
  //     question3: address,
  //   });
  // }

  useEffect(() => {
    logEvent("web.external.mentors_page.mission_complete_modal.modal_open");
  }, []);

  return (
    <CommonModal
      {...props}
      noHeaderText={formSuccess}
      headerText={t.translate("directus.page_mentors_surveys.form_2_title")}
    >
      {formSuccess ? (
        <SuccessMessage />
      ) : (
        <>
          <Subheading>{t.translate("directus.page_mentors_surveys.form_2_headline")}</Subheading>
          <Space size="m" />
          <form onSubmit={(e) => handleSubmit(e)}>
            <BodyText>{t.translate("directus.page_mentors_surveys.form_2_questions.question_1")} *</BodyText>
            <Space size="xs" />
            <div>
              <input
                name="question1"
                type="radio"
                value={MultipleChoiceOption.A}
                checked={amFormData.question1 === MultipleChoiceOption.A}
                id="question1_answer1"
                onChange={(e) => handleRadioChange(e)}
              />
              <S.RadioLabel htmlFor="question1_answer1">{answers.answer1}</S.RadioLabel>
            </div>
            <div>
              <input
                name="question1"
                type="radio"
                value={MultipleChoiceOption.B}
                checked={amFormData.question1 === MultipleChoiceOption.B}
                id="question1_answer2"
                onChange={(e) => handleRadioChange(e)}
              />
              <S.RadioLabel htmlFor="question1_answer2">{answers.answer2}</S.RadioLabel>
            </div>
            <div>
              <input
                name="question1"
                type="radio"
                value={MultipleChoiceOption.C}
                checked={amFormData.question1 === MultipleChoiceOption.C}
                id="question1_answer3"
                onChange={(e) => handleRadioChange(e)}
              />
              <S.RadioLabel htmlFor="question1_answer3">{answers.answer3}</S.RadioLabel>
            </div>
            {/* <div>
              <input
                name="question1"
                type="radio"
                value={MultipleChoiceOption.D}
                checked={amFormData.question1 === MultipleChoiceOption.D}
                id="question1_answer4"
                onChange={(e) => handleRadioChange(e)}
              />
              <S.RadioLabel htmlFor="question1_answer4">{answers.answer4}</S.RadioLabel>
            </div>
            <Space size="m" />
            <div>
              <BodyText>2. {t.translate("directus.page_mentors_surveys.form_2_questions.question_2")} *</BodyText>
              <Space size="xs" />
              <TextField
                type="date"
                name="question2"
                value={amFormData.question2}
                onChange={(date: Date) => setAmFormData({ ...amFormData, question2: date })}
              />
            </div>
            <Space size="m" />
            <AddressForm addressFormData={amFormData.question3} setAddressFormData={handleAddressChange} /> */}
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

export default AcceptMissionModal;
