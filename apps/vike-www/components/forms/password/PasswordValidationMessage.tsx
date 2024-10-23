import React from "react";
import posed, { Transition } from "react-pose";
import PasswordRequirements from "./PasswordRequirements";
import styled from "@emotion/styled";

const AnimatedInfoMessage = styled(
  posed.div({
    enter: { height: "auto" },
    exit: { height: 0 },
    transition: { default: { ease: "tween", duration: 1000 } },
  }),
)`
  overflow: hidden;
`;

type PasswordValidationProps = {
  pwFieldTouched: boolean;
  pwFieldBlurred: boolean;
  password?: string;
};

function PasswordValidationMessage({ password, pwFieldBlurred, pwFieldTouched }: PasswordValidationProps) {
  // Show validation component if input is touched AND
  // always when true
  // when not true, when field blurred and password invalid
  const showValidationMessage = pwFieldTouched;
  const validationMessage = <PasswordRequirements password={password} highlightRequirements={pwFieldBlurred} />;
  return (
    <Transition marginBottom={15}>
      <AnimatedInfoMessage key="password-info">{showValidationMessage && validationMessage}</AnimatedInfoMessage>
    </Transition>
  );
}

export default PasswordValidationMessage;
