import React from "react";

interface DonwnladButtonProps {
  isLoggedIn: boolean;
  downloadUrl: string;
  logEvent: () => void;
  onClick: () => void;
  [key: string]: any;
}

const DownloadButton: React.FC<DonwnladButtonProps> = ({ isLoggedIn, downloadUrl, onClick, logEvent, ...props }) => {
  return isLoggedIn ? (
    <a href={downloadUrl} target="_blank" rel="noreferrer" onClick={logEvent} {...props}>
      {props.children}
    </a>
  ) : (
    <button onClick={onClick} {...props}>
      {props.children}
    </button>
  );
};

export default DownloadButton;
