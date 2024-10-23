import React from "react";
import window from "global/window";
import { Button, Space } from "@src/components/nessie-web";
import * as S from "./styles";
import { Box, Flex } from "@src/components/Boxes";

type Props = {
  password: string;
  onSuccess: () => void;
  placeholder: string;
};

const PasswordWall: React.FC<Props> = ({ password, onSuccess, placeholder }) => {
  const [passValue, setPassValue] = React.useState("");
  const [passError, setPassError] = React.useState(false);

  const onError = () => {
    setPassValue("");
    setPassError(true);
  };

  const handleSubmission = () => {
    setPassError(false);
    if (password.toLowerCase() == passValue.toLowerCase()) {
      window.scrollTo({
        top: 0,
      });
      onSuccess();
    } else {
      onError();
    }
  };

  const handleKeyPress = (keyName) => {
    if (keyName == "Enter") handleSubmission();
  };

  return (
    <Flex flexDirection={["column", "row"]}>
      <Box minWidth={["300px", "360px"]}>
        <S.Input
          type="text"
          valid={!passError}
          validationMessage={passError ? "Wrong password, try again" : ""}
          value={passValue}
          onChange={(e) => setPassValue(e)}
          placeholder={placeholder ? placeholder : "Type the password to unlock this page"}
          onKeyUp={(e) => handleKeyPress(e.key)}
        />
      </Box>
      <Space size="m" />
      <Button kind="primary" onClick={handleSubmission}>
        Unlock
      </Button>
    </Flex>
  );
};

export default PasswordWall;
