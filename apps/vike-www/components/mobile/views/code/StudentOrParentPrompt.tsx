import withLocation from "@src/components/withLocation";
import React from "react";
import { Flex } from "@src/components/Boxes";
import Container from "@src/components/mobile/Container";
import Button from "@src/components/Button";
import { Text } from "@src/components/Text";
import Translate from "@src/components/translation/Translate";
import { Link } from "gatsby";

const StudentOrParentPrompt = withLocation(({ code }: { code: string }) => {
  const parentAction = `/ccs/${code}/join/parent`;
  const studentAction = `/ccs/${code}/join/student`;

  return (
    <Container>
      <Flex textAlign="center" alignItems="center" flexDirection="column">
        <Text fontWeight={600} margin="1.2em">
          <Translate path="codes.student_or_parent_prompt.are_you_student_or_parent" />
        </Text>

        <Button as={Link} width="220px" to={parentAction}>
          <Translate path="codes.student_or_parent_prompt.am_parent" />
        </Button>

        <Button as={Link} width="220px" marginTop="1.6rem" to={studentAction}>
          <Translate path="codes.student_or_parent_prompt.am_student" />
        </Button>
      </Flex>
    </Container>
  );
});

export default StudentOrParentPrompt;
