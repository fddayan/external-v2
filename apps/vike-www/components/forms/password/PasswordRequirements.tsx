import React, { useContext } from "react";
import { BodyText, CheckmarkIcon, CloseIcon, ListItem, theme } from "../../nessie-web";
import { hasAlphabeticalCharacter, hasMinimumLength, hasSpecialOrNumericCharacter } from "./pwValidityHelpers";
import { TranslationContext } from "@src/components/translation/TranslationContext";

const {
  colors: { dt_kiwi60, dt_taro60, dt_watermelon60 },
} = theme;

type PasswordRequirementsProps = {
  password: string;
  highlightRequirements: boolean;
};

const PasswordRequirements = ({ password, highlightRequirements }: PasswordRequirementsProps) => {
  const minimumLengthState = hasMinimumLength(password, 8) ? "valid" : highlightRequirements ? "invalid" : "pending";
  const alphabeticState = hasAlphabeticalCharacter(password) ? "valid" : highlightRequirements ? "invalid" : "pending";
  const numericSpecialState = hasSpecialOrNumericCharacter(password)
    ? "valid"
    : highlightRequirements
    ? "invalid"
    : "pending";
  const t = useContext(TranslationContext);

  return (
    <div>
      <BodyText css={{ fontWeight: "dt_bold", color: "dt_taro60", fontSize: "15px" }}>
        {t.translateWithFallback({
          str: "components.signup_teacher.password_requirements.password_must",
          fallback: "Password must:",
        })}
      </BodyText>
      <PasswordRequirement type="minimum-length" state={minimumLengthState} />
      <PasswordRequirement type="includes-alphabetic" state={alphabeticState} />
      <PasswordRequirement type="includes-numeric-or-special" state={numericSpecialState} />
    </div>
  );
};

type PasswordRequirementProps = {
  state: "valid" | "pending" | "invalid";
  type: "minimum-length" | "includes-alphabetic" | "includes-numeric-or-special";
};

const PasswordRequirement = ({ state, type }: PasswordRequirementProps) => {
  const checkIcon = <CheckmarkIcon size="xs" color="kiwi60" />;
  const xIcon = <CloseIcon size="xs" color="watermelon60" />;
  const emptyIcon = <CheckmarkIcon size="xs" color="taro60" />;
  const iconMap = {
    valid: checkIcon,
    pending: emptyIcon,
    invalid: xIcon,
  };
  const colorMap = {
    valid: dt_kiwi60,
    pending: dt_taro60,
    invalid: dt_watermelon60,
  };
  const icon = iconMap[state];
  const t = useContext(TranslationContext);
  const validationMessages = {
    "minimum-length": t.translateWithFallback({
      str: "components.signup_teacher.password_requirements.min_length",
      fallback: "Be at least 8 characters",
    }),
    "includes-alphabetic": t.translateWithFallback({
      fallback: "Include 1 alphabetical character",
      str: "components.signup_teacher.password_requirements.alpha_char",
    }),
    "includes-numeric-or-special": t.translateWithFallback({
      fallback: "Include 1 number or special character",
      str: "components.signup_teacher.password_requirements.num_or_special_char",
    }),
    "not-same-as-email": t.translateWithFallback({
      fallback: "Not be the same as email",
      str: "components.signup_teacher.password_requirements.not_same_as_email",
    }),
  } as const;

  const color = colorMap[state];

  return (
    <ListItem
      leftAccessory={icon}
      title={<BodyText css={{ color, fontSize: "15px" }}>{validationMessages[type]}</BodyText>}
    />
  );
};

export default PasswordRequirements;
