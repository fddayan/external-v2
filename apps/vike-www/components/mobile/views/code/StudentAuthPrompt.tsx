import withLocation from "@src/components/withLocation";
import { Link } from "gatsby";
import React, { useContext, useEffect } from "react";
import { Flex } from "@src/components/Boxes";
import Container from "@src/components/mobile/Container";
import Button from "@src/components/Button";
import { Text } from "@src/components/Text";
import Translate from "@src/components/translation/Translate";
import { checkAlreadyLoggedinStudent, UNKNOWN_SRC } from "@src/components/mobile/views/code/utils";
import { MobileDataContext } from "@src/components/mobile/MobileDataContext";
import useMetric from "@src/utils/useMetric";

const StudentAuthPrompt = withLocation(({ code, src }: { code: string; src: string }) => {
  const loginAction = `/sc/${code}/studentLogin?src=${src || UNKNOWN_SRC}`;
  const signupAction = `/sc/${code}/studentSignup?src=${src || UNKNOWN_SRC}`;
  const data = useContext(MobileDataContext);
  useMetric("lite.codes.student_auth_prompt");

  useEffect(() => {
    checkAlreadyLoggedinStudent(data.data, code);
  }, [data, code]);

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

export default StudentAuthPrompt;
