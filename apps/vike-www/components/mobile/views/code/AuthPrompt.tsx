import withLocation from "@src/components/withLocation";
import React from "react";
import { Flex } from "@src/components/Boxes";
import Container from "@src/components/mobile/Container";
import Button from "@src/components/Button";
import { Text } from "@src/components/Text";
import Translate from "@src/components/translation/Translate";
import { Link } from "gatsby";

const AuthPrompt = withLocation(({ loginAction, signupAction }: { loginAction: string; signupAction: string }) => {
  return (
    <Container>
      <Flex textAlign="center" alignItems="center" flexDirection="column">
        <Text fontWeight={600} margin="1.2em">
          <Translate path="codes.auth_prompt.to_connect" />
        </Text>

        <Button as={Link} width="220px" to={loginAction}>
          <Translate path="codes.auth_prompt.have_account" />
        </Button>

        <Button as={Link} width="220px" marginTop="1.6rem" to={signupAction}>
          <Translate path="codes.auth_prompt.create_account" />
        </Button>
      </Flex>
    </Container>
  );
});

export default AuthPrompt;
