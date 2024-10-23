import React, { useState } from "react";
import { Space, TextField, Button } from "@src/components/nessie-web";
import { Box, Flex } from "@src/components/Boxes";
import { TranslationType } from "@src/components/translation/TranslationContext";
import { BodyText, DetailText } from "@src/components/nessie-web";

export type SubscriptionFormProps = {
  btn?: {
    label?: string | TranslationType;
    url?: string | TranslationType;
  };
  input?: {
    width?: number | string;
    placeholder?: string;
    success?: string;
  };
  sendGridId?: string | TranslationType;
  label?: string | TranslationType;
  disclaimer?: string | TranslationType;
  whiteText?: boolean;
};

const SubscriptionForm = ({ sendGridId, input, label, btn, disclaimer, whiteText }: SubscriptionFormProps) => {
  const initialBtnProps = {
    label: (btn && btn.label) || "Sign up",
    disabled: false,
    kind: "primary",
  };

  const emailRegex = new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );

  const [inputValue, setInputValue] = useState("");
  const [btnState, setBtnState] = useState(initialBtnProps);
  const [errorMessage, setErrorMessage] = useState("");
  const [inputMessage, setInputMessage] = useState("");
  const [valid, setValid] = useState(true);

  const textColor = whiteText ? "dt_white" : "dt_taro90";

  const resetInput = () => {
    setInputValue("");
    setValid(true);
    setErrorMessage("");
    setInputMessage("");
  };
  const resetButtonLabel = () => setBtnState(initialBtnProps);
  const disableButton = (label) =>
    setBtnState({
      label,
      disabled: true,
      kind: "secondary",
    });

  const testInputValue = () => {
    if (inputValue == "") {
      return {
        error: true,
        message: "The email field can't be empty",
      };
    }
    if (!emailRegex.test(inputValue)) {
      return {
        error: true,
        message: "Please use a valid email",
      };
    }
    return {
      error: false,
      message: "",
    };
  };

  const handleSubmit = ({ email, listId }) => {
    setValid(true);
    setErrorMessage("");
    const inputValueStatus = testInputValue();
    if (inputValueStatus.error) {
      setValid(false);
      setErrorMessage(inputValueStatus.message);
    } else {
      disableButton("Sending");
      fetch("/api/sendgridSubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          listId,
        }),
      }).then((response) => {
        resetButtonLabel();
        if (response.status >= 200 && response.status < 300) {
          setInputMessage(input.success);
        } else {
          setValid(false);
          setErrorMessage(`${response.statusText}. Please try again in a few moments`);
        }
        setTimeout(resetInput, 10000);
      });
    }
  };

  return (
    <Box>
      <BodyText color={textColor}>{label}</BodyText>
      <Space size="s" />
      <Flex
        flexWrap={["wrap", "nowrap"]}
        alignItems="flex-start"
        justifyContent={["center", "flex-start"]}
        id="sendgrid-form"
      >
        <Box minWidth={["100%", input.width]} marginBottom={["12px", 0]} marginRight={[0, "12px"]}>
          <TextField
            type="email"
            placeholder={input.placeholder}
            onChange={(v) => setInputValue(v)}
            value={inputValue}
            valid={valid}
            validationMessage={errorMessage}
            message={inputMessage}
          />
        </Box>
        {btn && btn.url ? (
          <Button href={btn.url}>{btnState.label}</Button>
        ) : (
          <Button
            kind={btnState.kind}
            disabled={btnState.disabled}
            id="sendgrid-submit"
            onClick={() => handleSubmit({ email: inputValue, listId: sendGridId })}
          >
            {btnState.label}
          </Button>
        )}
      </Flex>
      <Space size="s" />
      {disclaimer && <DetailText color={textColor}>{disclaimer}</DetailText>}
    </Box>
  );
};

SubscriptionForm.defaultProps = {
  input: {
    placeholder: "Enter your e-mail",
    width: "300px",
    success: "Success!",
  },
};
export default SubscriptionForm;
