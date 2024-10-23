import { useTheme } from "@emotion/react";
import CommonModal from "@src/components/modals/CommonModal";
import { useCreateConvertExperimentEvent } from "@src/utils/experiment";
import { ExternalSwitches } from "@src/utils/experiments/constants";
import React, { ChangeEventHandler, useEffect, useRef, useState } from "react";
import { styles } from "./styles";
import { DetailText } from "@src/components/nessie-web";
import cookies from "cookies-js";
import { logEvent } from "@src/utils/logClient";

export interface GetTemplatesModalProps {
  logo: string;
  title: string;
  tagline: string;
  heroImage: string;
  description: string;
  q1: {
    text: string;
    placeholder: [string, string];
  };
  q2: {
    text: string;
    options: {
      label: string;
      value: string;
    }[];
  };
  q3: {
    text: string;
    placeholder: string;
  };
  q4: {
    text: string;
    placeholder: string;
  };
  q5: {
    text: string;
  };
  q6: {
    text: string;
  };
  q7: {
    text: string;
    placeholder: string;
  };
  q8: {
    text: string;
    placeholder: string;
  };
  cta: {
    label: string;
    url: string;
  };
  closeModal: () => void;
}

export interface FormData {
  firstname: string;
  lastname: string;
  role: string;
  email: string;
  school: string;
  addressone: string;
  addresstwo: string;
  city: string;
  state: string;
}

const formInitialData = {
  firstname: "",
  lastname: "",
  role: "districtleader",
  email: "",
  school: "",
  addressone: "",
  addresstwo: "",
  city: "",
  state: "",
};

const GetTemplatesModal: React.FC<GetTemplatesModalProps> = (props) => {
  const theme = useTheme();
  const css = styles(theme);
  const [formData, setFormData] = useState<FormData>(formInitialData);
  const [isFormValid, setIsFormValid] = useState(false);
  const formRef = useRef(null);
  const experimentModal = ExternalSwitches.WEB_EXTERNAL_SCHOOLS_COMMTEMPLATE_DOWNLOAD_MODAL;
  const convertModalExperiment = useCreateConvertExperimentEvent(experimentModal);

  const handleTextChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCtaClick = () => {
    if (formRef.current) formRef.current.submit();
    convertModalExperiment();
    cookies.set("schoolsPageExpModalClosed", "true", { expires: 365 });
    logEvent({
      eventName: "teacher.classdojo_school.modal_form.submit",
      eventValue: location.href,
    });
  };

  useEffect(() => {
    if (formRef.current) setIsFormValid(formRef.current.checkValidity());
  }, [formData]);

  useEffect(() => {
    logEvent({
      eventName: "teacher.classdojo_school.modal_form.show",
      eventValue: location.href,
    });
  }, []);

  return (
    <CommonModal noHeader closeModal={props.closeModal}>
      <div css={css.hero}>
        <div css={css.flex}>
          <div>
            <p css={css.tagline}>{props.tagline}</p>
            <h2 css={css.title}>{props.title}</h2>
          </div>
          <img css={css.heroImage} src={props.heroImage} alt="" />
        </div>
      </div>
      <div css={css.content}>
        <>
          <p css={css.description}>{props.description}</p>
          <form ref={formRef} action="https://learn.classdojo.com/l/1046033/2024-09-06/jf7n" method="post">
            <div css={css.question}>
              <label htmlFor="q1">{props.q1.text}</label>
              <input
                required
                placeholder={props.q1.placeholder[0]}
                id="q1"
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleTextChange}
              />
              <input
                required
                placeholder={props.q1.placeholder[1]}
                id="q2"
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleTextChange}
              />
            </div>
            <div css={css.question}>
              <label htmlFor="q2">{props.q2.text}</label>
              <select name="role" value={formData.role}>
                {props.q2.options.map(({ label, value }, index) => (
                  <option key={index} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
            <div css={css.question}>
              <label htmlFor="q3">{props.q3.text}</label>
              <input
                required
                placeholder={props.q3.placeholder}
                id="q3"
                type="text"
                name="email"
                value={formData.email}
                onChange={handleTextChange}
              />
            </div>
            <div css={css.question}>
              <label htmlFor="q4">{props.q4.text}</label>
              <input
                required
                placeholder={props.q4.placeholder}
                id="q4"
                type="text"
                name="school"
                value={formData.school}
                onChange={handleTextChange}
              />
            </div>
            <div css={css.question}>
              <label htmlFor="q5">{props.q5.text}*</label>
              <input
                required
                id="q5"
                type="text"
                name="addressone"
                value={formData.addressone}
                onChange={handleTextChange}
              />
            </div>
            <div css={css.question}>
              <label htmlFor="q6">{props.q6.text}</label>
              <input id="q6" type="text" name="addresstwo" value={formData.addresstwo} onChange={handleTextChange} />
            </div>
            <div style={{ display: "flex", gap: 6, marginTop: -6 }}>
              <div style={{ flex: 3 }}>
                <div css={css.question}>
                  <label htmlFor="q7">{props.q7.text}*</label>
                  <input
                    required
                    placeholder={props.q7.placeholder}
                    id="q7"
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleTextChange}
                  />
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div css={css.question}>
                  <label htmlFor="q8">{props.q8.text}*</label>
                  <input
                    required
                    placeholder={props.q8.placeholder}
                    id="q8"
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleTextChange}
                  />
                </div>
              </div>
            </div>
          </form>
          <p css={css.required}>* Required</p>
          <a onClick={handleCtaClick} css={css.cta(isFormValid)} href={props.cta.url} target="_blank" rel="noreferrer">
            {props.cta.label}
          </a>
        </>
      </div>
    </CommonModal>
  );
};

export default GetTemplatesModal;
