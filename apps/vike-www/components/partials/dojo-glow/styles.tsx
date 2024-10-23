import React from "react";
import { css, Theme } from "@emotion/react";
import { CSSProperties } from "@emotion/serialize";
import styled from "@emotion/styled";
import { logEvent } from "@src/utils/logClient";

import { Button as NessieButton } from "@src/components/nessie-web";
import { Typography } from "@src/components/Typography";

type Variants = "primary" | "secondary";

export interface Button {
  variant: Variants;
}

type BuildVariant = (theme: Theme) => CSSProperties;

const VARIANTS: Record<Variants, BuildVariant> = {
  primary: (theme) => ({
    span: {
      color: theme.__new.colors.contentLight,
    },
    background: theme.__new.colors.contentAccent,
    ":hover, :focus, :active": {
      background: theme.__new.colors.contentAccentHover,
    },
  }),
  secondary: (theme) => ({
    span: {
      color: theme.__new.colors.contentAccent,
    },
    background: theme.__new.colors.grape10,
    ":hover, :focus, :active": {
      background: theme.__new.colors.grape20,
    },
  }),
};

export const ButtonPrimaryStyled = styled(NessieButton)<Button>(
  {
    borderRadius: 100,
    minWidth: 140,
  },
  ({ theme, variant }) => VARIANTS[variant](theme),
);

export interface EventLogArgs {
  name: string;
  value?: string;
  metadata?: Record<string, string>;
}

export interface ButtonPrimaryProps {
  variant: Variants;
  eventLog: EventLogArgs;
  children: React.ReactNode;
  onClick?: () => void;
  icon?: React.ReactNode;
}

export const ButtonPrimary = ({ eventLog, onClick, ...rest }: ButtonPrimaryProps) => {
  const handleOnClick = () => {
    logEvent({
      eventName: eventLog.name,
      eventValue: window.location.href,
    });
    if (onClick) {
      onClick();
    }
  };

  return <ButtonPrimaryStyled {...rest} onClick={handleOnClick} />;
};

export const BASE_EVENT_NAME = "web.external.dojo_glow";

export const buildEventLog = (name: string): EventLogArgs => {
  return {
    name: `${BASE_EVENT_NAME}.${name}`,
  };
};

export const Headline = styled(Typography)`
  color: ${({ theme }) => theme.__new.colors.cloud80};
`;
