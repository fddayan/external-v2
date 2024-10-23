import withLocation from "@src/components/withLocation";
import Container from "@src/components/mobile/Container";
import { Flex } from "@src/components/Boxes";
import { Text } from "@src/components/Text";
import Translate from "@src/components/translation/Translate";
import GetTheApp from "@src/components/mobile/GetTheApp";
import React from "react";
import useMetric from "@src/utils/useMetric";

const StudentDone = withLocation(
  ({ username, userType }: { username: string; userType: "parent" | "student" | "teacher" }) => {
    useMetric("lite.codes.student_done");

    return (
      <Container>
        <Flex textAlign="center" flexDirection="column" alignItems="center">
          <Text m="16px">
            <Translate path="codes.student_done.congrats" />
            {username && <Translate path="codes.student_done.your_username" subs={{ username }} />}
          </Text>
          <Text m="16px">
            {username && <Translate path="codes.student_done.use_it_to_log_in" />}
            {!username && <Translate path="codes.student_done.log_in_at" />}
          </Text>
          <GetTheApp entityType={userType || "student"} />
        </Flex>
      </Container>
    );
  },
);

export default StudentDone;
