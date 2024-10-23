import { useTheme } from "@emotion/react";
import CommonModal from "@src/components/modals/CommonModal";
import { DownloadIcon, TextField } from "@src/components/nessie-web";
import React from "react";

interface EmailModalProps {
  closeModal: () => void;
  handleDownloadClick: (eventId: string) => void;
  image: string;
  inputValue: string;
  handleInputChange: (value: string) => void;
  eventId: string;
  downloadUrl: string;
}

const EmailModal: React.FC<EmailModalProps> = (props) => {
  const theme = useTheme();

  const handleClick = () => {
    props.handleDownloadClick(props.eventId);
    props.closeModal();
  };

  const buttonCss = {
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

  return (
    <CommonModal noHeader closeModal={props.closeModal}>
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          gap: 30,
          alignItems: "center",
        }}
      >
        <img src={props.image} alt="" />
        <h3 css={{ margin: 0 }}>Enter your Mentor e-mail to get your kit</h3>
        <TextField
          required
          type="email"
          value={props.inputValue}
          onChange={(value: string) => props.handleInputChange(value)}
          css={{ width: "100%" }}
        />
        <a css={buttonCss} href={props.downloadUrl} onClick={handleClick}>
          <DownloadIcon color="white" />
          Download
        </a>
      </div>
    </CommonModal>
  );
};

export default EmailModal;
