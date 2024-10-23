import React, { ReactNode } from "react";
import { Button } from "@src/components/new-nessie";
import { useTheme } from "@emotion/react";

interface DonwnladButtonProps {
  isLoggedIn: boolean;
  downloadUrl: string;
  openModal: () => void;
  logDownloadEvent: () => void;
  children: ReactNode;
}

const DownloadButton: React.FC<DonwnladButtonProps> = (props) => {
  const theme = useTheme();

  const css = {
    display: "flex",
    boxSizing: "border-box",
    color: "white",
    backgroundColor: theme.__new.colors.contentAccent,
    textAlign: "center",
    verticalAlign: "middle",
    cursor: "pointer",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
    gap: 12,
    padding: "12px 28px",
    lineHeight: 1.3,
    fontWeight: 600,
    borderRadius: 99,
    fontSize: 20,
    height: 64,
    fontFamily: `DojoText, "Helvetica Neue", Helvetica, Arial, sans-serif`,
    width: "fit-content",
  } as const;

  return props.isLoggedIn ? (
    <a
      href={props.downloadUrl}
      css={css}
      onClick={props.logDownloadEvent}
      target="_blank"
      rel="noreferrer"
    >
      {props.children}
    </a>
  ) : (
    <Button css={{ margin: "auto" }} noIcon onClick={props.openModal}>
      {props.children}
    </Button>
  );
};

export default DownloadButton;
