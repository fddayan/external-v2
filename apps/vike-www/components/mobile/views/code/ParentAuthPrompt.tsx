import withLocation from "@src/components/withLocation";
import React, { useContext, useEffect } from "react";
import { Link } from "gatsby";
import { Flex } from "@src/components/Boxes";
import Container from "@src/components/mobile/Container";
import Button from "@src/components/Button";
import { Text } from "@src/components/Text";
import Translate from "@src/components/translation/Translate";
import { MobileDataContext } from "@src/components/mobile/MobileDataContext";
import { checkAlreadyLoggedinParent, UNKNOWN_SRC } from "@src/components/mobile/views/code/utils";
import useMetric from "@src/utils/useMetric";

const ParentAuthPrompt = withLocation(({ code, src }: { code: string; src: string }) => {
  const loginAction = `/sc/${code}/parentLogin?src=${src || UNKNOWN_SRC}`;
  const signupAction = `/sc/${code}/parentSignup?src=${src || UNKNOWN_SRC}`;
  const data = useContext(MobileDataContext);
  useMetric("lite.codes.parent_auth_prompt");
  useEffect(() => {
    if (data) {
      checkAlreadyLoggedinParent(data.data, code);
    }
  }, [code, data]);

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

export default ParentAuthPrompt;
