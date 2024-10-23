import React, { useEffect, useState, useContext, useRef } from "react";
import { Button, BodyText, DetailText, Heading } from "@src/components/nessie-web";
import CommonModal from "@src/components/modals/CommonModal";
import styled from "@emotion/styled";
import { logEvent } from "@src/utils/logClient";
import { TranslationContext } from "@src/components/translation/TranslationContext";
import Translate from "@src/components/translation/Translate";

type CalendlyModalProps = {
  calendlyLink: string;
  closeModal: () => void;
  logEventContext: string;
};

const CalendarIframeContainer = styled("div")`
  width: 100%;
  height: calc(100vh - 100px);
  margin: 24px 0;
  border-radius: 24px;
`;
const CaptchaContainer = styled("div")`
  margin-top: 80px;
  height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 12px;
`;

const StyledInput = styled.input`
  border: 1px solid #ccc;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  height: 49px;
  padding: 10px 16px;
  font-size: 16px;
  font-weight: 300;
  line-height: 1.33;
  border-radius: 5px;
  margin: 1px;
  border-radius: 15px;
  width: 100%;
`;

const CalendarIframe = styled("iframe")`
  width: 100%;
  height: calc(100vh - 100px);
  margin: 24px 0;
  border: 0;
  border-radius: 24px;
`;

const CalendlyModal: React.FC<CalendlyModalProps> = ({ calendlyLink, closeModal, logEventContext }) => {
  const t = useContext(TranslationContext);
  const calendlyRef = useRef(null);

  const numberNames = {
    0: t.translate("calendly.zero"),
    1: t.translate("calendly.one"),
    2: t.translate("calendly.two"),
    3: t.translate("calendly.three"),
    4: t.translate("calendly.four"),
    5: t.translate("calendly.five"),
    6: t.translate("calendly.six"),
    7: t.translate("calendly.seven"),
    8: t.translate("calendly.eight"),
    9: t.translate("calendly.nine"),
  };

  const [captcha, setCaptcha] = useState({
    inputValue: "",
    question: "",
    answer: "",
    valid: false,
    error: false,
  });

  function generateCaptcha() {
    const a = Math.floor(Math.random() * 10);
    const b = Math.floor(Math.random() * 10);
    const answer = a + b;
    setCaptcha({
      inputValue: "",
      question: t.translate("calendly.question", { numberA: numberNames[a], numberB: numberNames[b] }),
      answer: answer.toString(),
      valid: false,
      error: false,
    });
  }

  function handleCaptchaChange(event) {
    setCaptcha({
      ...captcha,
      inputValue: event.target.value,
    });
  }

  function submitCaptcha() {
    if (captcha.inputValue === captcha.answer) {
      setCaptcha({ ...captcha, valid: true });
      logEvent({
        eventName: `web.external.${logEventContext}.show_calendly_ui`,
        eventValue: window.location.href,
      });
    } else {
      generateCaptcha();
      setCaptcha({ ...captcha, error: true, inputValue: "" });
      logEvent({
        eventName: `web.external.${logEventContext}.fail_captcha`,
        eventValue: window.location.href,
      });
    }
  }
  const loadAndInitCalendly = () => {
    let scriptAdded = false;
    if (!document.querySelector("script[src='https://assets.calendly.com/assets/external/widget.js']")) {
      const script = document.createElement("script");
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      script.onload = () => {
        if (calendlyRef.current) {
          Calendly.initInlineWidget({
            url: calendlyLink,
            parentElement: calendlyRef.current,
            prefill: {},
            utm: {},
          });
        }
      };
      document.body.appendChild(script);
      scriptAdded = true;
    } else {
      Calendly.initInlineWidget({
        url: calendlyLink,
        parentElement: calendlyRef.current,
        prefill: {},
        utm: {},
      });
    }

    return () => {
      if (scriptAdded) {
        const script = document.querySelector("script[src='https://assets.calendly.com/assets/external/widget.js']");
        if (script) {
          document.body.removeChild(script);
        }
      }
    };
  };

  useEffect(() => {
    logEvent({
      eventName: `web.external.${logEventContext}.schedule_demo`,
      eventValue: window.location.href,
    });
    generateCaptcha();
  }, []);

  useEffect(() => {
    if (captcha.valid) {
      const cleanup = loadAndInitCalendly();
      return cleanup;
    }
  }, [captcha.valid]);

  useEffect(() => {
    const isCalendlyEvent = (e) => {
      return e.data.event && e.data.event.indexOf("calendly") === 0;
    };

    const handleCalendlyEvent = (e) => {
      if (isCalendlyEvent(e)) {
        logEvent({
          eventName: `web.external.${logEventContext}.${e.data.event}`,
          eventValue: window.location.href,
        });
      }
    };

    window.addEventListener("message", handleCalendlyEvent);

    return () => {
      window.removeEventListener("message", handleCalendlyEvent);
    };
  }, [logEventContext]);

  return (
    <CommonModal fullScreen noHeader closeModal={closeModal}>
      {!captcha.valid ? (
        <CaptchaContainer>
          <Heading color="#3E11A7" css={{ color: "#3E11A7", marginBottom: 40 }}>
            <Translate path="calendly.introduction" />
          </Heading>
          <BodyText>{captcha.question}</BodyText>
          <StyledInput
            id="captcha"
            name="captcha"
            type="text"
            value={captcha.inputValue}
            onChange={handleCaptchaChange}
            required
          />
          <DetailText>
            {captcha.error ? t.translate("calendly.invalid") : t.translate("calendly.instructions")}
          </DetailText>
          <Button kind="plus" onClick={submitCaptcha}>
            <Translate path="calendly.verify" />
          </Button>
        </CaptchaContainer>
      ) : (
        <CalendarIframeContainer ref={calendlyRef} />
      )}
    </CommonModal>
  );
};

export default CalendlyModal;
