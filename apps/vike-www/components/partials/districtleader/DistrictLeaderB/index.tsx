/* eslint-disable react-hooks/exhaustive-deps */
import CommonModal from "@src/components/modals/CommonModal";
import { BodyText, Button, DetailText, TextField } from "@src/components/nessie-web";
import IconFromString from "@src/components/nessie-web/IconFromString";
import React, { useEffect, useState } from "react";
import * as S from "./styles";

const numberNames = {
  0: "zero",
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight",
  9: "nine",
};

interface DistrictLeaderBProps {
  heading: string;
  tagline: string;
  features: {
    icon: {
      name: string;
      color: string;
    };
    text: string;
  }[];
  calendlyEmbed: string;
  oneToOneCallText: string;
  oneToOneCallQuestion: string;
  oneToOneCtaLabel: string;
  moreInfoQuestion: string;
  moreInfoCtaLabel: string;
  moreInfoCtaAction: () => void;
}

const DistrictLeaderB: React.FC<DistrictLeaderBProps> = (props) => {
  const [showCalendly, setShowCalendly] = useState(false);
  const [captcha, setCaptcha] = useState({
    inputValue: "",
    question: "",
    answer: "",
    valid: false,
    error: false,
  });

  const openCalendly = () => setShowCalendly(true);

  const closeCalendly = () => {
    setShowCalendly(false);
    setCaptcha({
      ...captcha,
      error: false,
      valid: false,
    });
    generateCaptcha();
  };

  function handleCaptchaChange(value: string) {
    setCaptcha({
      ...captcha,
      inputValue: value,
    });
  }

  function submitCaptcha() {
    if (captcha.inputValue === captcha.answer) {
      setCaptcha({ ...captcha, valid: true });
    } else {
      generateCaptcha();
      setCaptcha({ ...captcha, error: true });
    }
  }

  function generateCaptcha() {
    const a = Math.floor(Math.random() * 10);
    const b = Math.floor(Math.random() * 10);
    const answer = a + b;
    setCaptcha({
      ...captcha,
      question: `How much is ${numberNames[a]} plus ${numberNames[b]}?`,
      answer: answer.toString(),
    });
  }

  useEffect(() => {
    generateCaptcha();
  }, []);

  return (
    <>
      <S.PageContainer>
        <div css={{ maxWidth: "800px", margin: "auto" }}>
          <h1>{props.heading}</h1>
          <p>
            <strong>{props.tagline}</strong>
          </p>
        </div>
        <S.Features>
          {props.features.map((feature, index) => (
            <S.Feature key={index}>
              <IconFromString iconName={feature.icon.name} color={feature.icon.color} size="xxl" />
              <p>{feature.text}</p>
            </S.Feature>
          ))}
        </S.Features>
        <S.CtaBlock>
          <p>{props.oneToOneCallText}</p>
          <p>
            <em>{props.oneToOneCallQuestion}</em>
          </p>
          <Button kind="plus" onClick={openCalendly}>
            {props.oneToOneCtaLabel}
          </Button>
        </S.CtaBlock>
        <S.CtaBlock>
          <p>{props.moreInfoQuestion}</p>
          <Button kind="plus" onClick={props.moreInfoCtaAction}>
            {props.moreInfoCtaLabel}
          </Button>
        </S.CtaBlock>
      </S.PageContainer>
      {showCalendly && (
        <CommonModal fullScreen noHeader closeModal={closeCalendly}>
          {!captcha.valid ? (
            <S.CaptchaContainer>
              <BodyText>{captcha.question}</BodyText>
              <TextField
                id="captcha"
                name="captcha"
                type="captcha"
                value={captcha.inputValue}
                onChange={handleCaptchaChange}
                required
              />
              <DetailText>
                {captcha.error ? "Invalid answer!" : "Enter your answer as a number (1, 2, 3...)"}
              </DetailText>
              <Button kind="plus" onClick={submitCaptcha}>
                Verify
              </Button>
            </S.CaptchaContainer>
          ) : (
            <S.CalendarIframe src={props.calendlyEmbed} />
          )}
        </CommonModal>
      )}
    </>
  );
};

export default DistrictLeaderB;
