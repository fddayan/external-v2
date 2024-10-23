/* eslint-disable jsx-a11y/label-has-associated-control */
import { useTheme } from "@emotion/react";
import Translate from "@src/components/translation/Translate";
import { TranslationContext } from "@src/components/translation/TranslationContext";
import React, { ChangeEventHandler, useContext, useEffect, useRef, useState } from "react";
import styles from "./styles";
import ClassDojoLogo from "@src/assets/images/ClassDojo-Logo.svg";
import CommonModal from "@src/components/modals/CommonModal";

export interface IFormData {
  email: string;
  firstname: string;
  lastname: string;
  role: string;
  school: string;
  addressone: string;
  addresstwo: string;
  city: string;
  state: string;
}

export interface DownloadModalProps {
  success: boolean;
  title: string;
  description: string;
  closeModal: () => void;
  q1: {
    text: string;
    placeholder: [string, string];
  };
  q2: {
    text: string;
    options: string[];
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
    id: string;
  };
}

const DownloadModal: React.FC<DownloadModalProps> = (props) => {
  const [formData, setFormData] = useState<IFormData>({
    email: "",
    firstname: "",
    lastname: "",
    role: "",
    school: "",
    addressone: "",
    addresstwo: "",
    city: "",
    state: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const formRef = useRef(null);
  const { translate: t } = useContext(TranslationContext);

  const theme = useTheme();
  const css = styles(theme);

  const handleSubmit = () => {
    formRef.current.submit();
  };

  const handleTextChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    if (formRef.current) setIsFormValid(formRef.current.checkValidity());
  }, [formData]);

  return (
    <CommonModal noHeader closeModal={props.closeModal}>
      <img css={css.logo} src={ClassDojoLogo} alt="ClassDojo logo" />
      <h1 css={css.title}>
        <Translate path={props.title} />
      </h1>
      <p css={css.description}>
        <Translate path={props.description} />
      </p>
      {props.success ? (
        <p css={css.success}>Success!</p>
      ) : (
        <form ref={formRef} action="https://learn.classdojo.com/l/1046033/2024-09-02/hyxy" method="post">
          <div css={css.question}>
            <label htmlFor="q1">
              <Translate path={props.q1.text} />
            </label>
            <input
              required
              id="q1"
              name="firstname"
              placeholder={t(props.q1.placeholder[0]).toString()}
              type="text"
              value={formData.firstname}
              onChange={handleTextChange}
              css={{ width: "100%", marginBottom: 6 }}
            />
            <input
              required
              name="lastname"
              placeholder={t(props.q1.placeholder[1]).toString()}
              type="text"
              value={formData.lastname}
              onChange={handleTextChange}
              css={{ width: "100%" }}
            />
          </div>
          <div css={css.radio}>
            <label>
              <Translate path={props.q2.text} />
            </label>
            {props.q2.options.map((translationKey, index) => {
              const answer = t(translationKey).toString();
              const value = answer.toLowerCase().replace(" ", "_");
              return (
                <div key={index}>
                  <input
                    required
                    name="role"
                    type="radio"
                    value={value}
                    checked={value === formData.role}
                    id={`q2_option${index + 1}`}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  />
                  <label htmlFor={`q2_option${index + 1}`}>{answer}</label>
                </div>
              );
            })}
          </div>
          <div css={css.question}>
            <label htmlFor="q3">
              <Translate path={props.q3.text} />
            </label>
            <input
              required
              id="q3"
              name="email"
              placeholder={t(props.q3.placeholder).toString()}
              type="email"
              value={formData.email}
              onChange={handleTextChange}
              css={{ width: "100%", marginBottom: 6 }}
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
            <label htmlFor="q5">{props.q5.text}</label>
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
            <input
              required
              id="q6"
              type="text"
              name="addresstwo"
              value={formData.addresstwo}
              onChange={handleTextChange}
            />
          </div>
          <div style={{ display: "flex", gap: 6, marginTop: -6 }}>
            <div style={{ flex: 3 }}>
              <div css={css.question}>
                <label htmlFor="q7">{props.q7.text}</label>
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
                <label htmlFor="q8">{props.q8.text}</label>
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
          <a
            css={css.button(isFormValid)}
            onClick={() => handleSubmit()}
            href={props.cta.url}
            target="_blank"
            rel="noreferrer"
          >
            <Translate path={props.cta.label} />
          </a>
        </form>
      )}
    </CommonModal>
  );
};

export default DownloadModal;
