import React, { ChangeEvent, FormEvent, useState, useContext } from "react";
import { logEvent } from "@src/utils/logClient";
import { Button, Heading, CheckmarkIcon, DownloadIcon, theme, BodyText } from "../nessie-web";
import { Body1, Body2 } from "../partials/schoolleader/styles";
import CommonModal, { CommonModalProps } from "./CommonModal";
import styled from "@emotion/styled";
import { TranslationContext } from "../translation/TranslationContext";
import { ExternalSwitches } from "@src/utils/experiments/constants";

const ModalContent = styled("div")`
  font-size: 18px;
  line-height: 1.7;
  text-align: left;

  em {
    font-style: normal;
    font-weight: 700;
  }
  input[type="email"],
  textarea {
    display: block;
    margin-bottom: 12px;
    width: 100%;
    padding: 12px 24px;
    border-radius: 99px;
    border: 2px solid ${theme.colors.taro30};
    background-color: ${theme.colors.taro10};
  }
  input[type="radio"],
  input[type="checkbox"] {
    margin-right: 6px;
  }
  button {
    padding: 18px 80px;
    margin: auto;
  }
  .confirmEmailField {
    display: none;
  }
`;

const reasonOptions = [
  { value: "casual", label: "schools_page_lead_gen_form.casual" },
  { value: "testing", label: "schools_page_lead_gen_form.testing" },
  { value: "decided", label: "schools_page_lead_gen_form.decided" },
];

const contactOptions = [
  { value: "demo", label: "schools_page_lead_gen_form.demo" },
  { value: "guide", label: "schools_page_lead_gen_form.guide" },
  { value: "email", label: "schools_page_lead_gen_form.email" },
  { value: "no_contact", label: "schools_page_lead_gen_form.no_contact" },
];

const usageIntentionOptions = [
  { value: "communicate", label: "schools_page_lead_gen_form.communicate" },
  { value: "positive_behavior", label: "schools_page_lead_gen_form.positive_behavior" },
  { value: "support_teachers", label: "schools_page_lead_gen_form.support_teachers" },
  { value: "not_sure", label: "schools_page_lead_gen_form.not_sure" },
];

const SchoolsPageLeadGen: React.FC = (props) => {
  const [pardotFormData, setPardotFormData] = useState({
    email: "",
    reason: "",
    contact: "",
    user_comments: "",
    usage_intention: [],
    confirmEmail: "",
  });
  const t = useContext(TranslationContext);

  function handleSubmit(ev: FormEvent) {
    ev.preventDefault();

    if (pardotFormData.confirmEmail) {
      ev.preventDefault();
      return;
    }
    const email = pardotFormData.email.toLowerCase();
    if (email.endsWith("@gmail.com") || email.endsWith("@outlook.com") || email.endsWith("@yahoo.com")) {
      window.alert(
        "We've noticed you've entered a personal email address. For a more tailored experience, we kindly ask you to use your work email address.",
      );
      return;
    }
    logEvent({
      eventName: "web.external.schools.submit_lead_gen_form",
    });
    const form = ev.target as HTMLFormElement;
    form.submit();
  }

  function handleInputChange(ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value, type, checked } = ev.target;

    if (type === "checkbox") {
      setPardotFormData((prevFormData) => ({
        ...prevFormData,
        [name]: checked ? [...prevFormData[name], value] : prevFormData[name].filter((item: string) => item !== value),
      }));
    } else {
      setPardotFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  }

  return (
    <CommonModal noHeaderText {...props}>
      <ModalContent>
        <>
          <div css={{ textAlign: "center", marginBottom: 20 }}>
            <Heading css={{ marginBottom: 0 }}>{t.translate("schools_page_lead_gen_form.heading")}</Heading>
            <BodyText>{t.translate("schools_page_lead_gen_form.subheading")}</BodyText>
          </div>
          <div>
            <form action="https://learn.classdojo.com/l/1046033/2024-03-24/56f8" method="post" onSubmit={handleSubmit}>
              <div css={{ marginBottom: 20 }}>
                <BodyText css={{ fontWeight: 700, marginBottom: 12 }}>
                  {t.translate("schools_page_lead_gen_form.q1")}
                </BodyText>
                {usageIntentionOptions.map((option, index) => (
                  <label key={index} css={{ display: "flex", marginBottom: 6 }}>
                    <input type="checkbox" name="usage_intention" value={option.value} onChange={handleInputChange} />
                    <Body2 css={{ color: "#2C2A50" }}>{t.translate(option.label)}</Body2>
                  </label>
                ))}
              </div>
              <div css={{ marginBottom: 20 }}>
                <BodyText css={{ fontWeight: 700, marginBottom: 12 }}>
                  {t.translate("schools_page_lead_gen_form.q2")}
                </BodyText>
                {reasonOptions.map((option) => (
                  <label key={option.value} css={{ display: "flex", marginBottom: 6 }}>
                    <input type="radio" name="reason" value={option.value} onChange={handleInputChange} />
                    <Body2 css={{ color: "#2C2A50" }}>{t.translate(option.label)}</Body2>
                  </label>
                ))}
              </div>
              <div css={{ marginBottom: 20 }}>
                <BodyText css={{ fontWeight: 700, marginBottom: 12 }}>
                  {t.translate("schools_page_lead_gen_form.q3")}
                </BodyText>
                {contactOptions.map((option) => (
                  <label key={option.value} css={{ display: "flex", marginBottom: 6 }}>
                    <input type="radio" name="contact" value={option.value} onChange={handleInputChange} />
                    <Body2 css={{ color: "#2C2A50" }}>{t.translate(option.label)}</Body2>
                  </label>
                ))}
              </div>
              <div css={{ marginBottom: 20 }}>
                <BodyText css={{ fontWeight: 700, marginBottom: 12 }}>
                  {t.translate("schools_page_lead_gen_form.q4")}
                </BodyText>
                <textarea
                  name="user_comments"
                  value={pardotFormData.user_comments}
                  onChange={handleInputChange}
                  placeholder="User Comments"
                />
              </div>
              <div css={{ marginBottom: 20 }}>
                <BodyText css={{ fontWeight: 700, marginBottom: 12 }}>
                  {t.translate("schools_page_lead_gen_form.q5")}
                </BodyText>
                <input
                  name="email"
                  type="email"
                  value={pardotFormData.email}
                  onChange={handleInputChange}
                  placeholder="Email Address"
                  required
                />
              </div>
              <input
                className="confirmEmailField"
                type="text"
                name="confirmEmail"
                value={pardotFormData.confirmEmail}
                placeholder="Confirm your work e-mail address"
                onChange={handleInputChange}
              />
              <Button kind="plus" type="submit">
                {t.translate("schools_page_lead_gen_form.button")}
              </Button>
            </form>
          </div>
        </>
      </ModalContent>
    </CommonModal>
  );
};

export default SchoolsPageLeadGen;
