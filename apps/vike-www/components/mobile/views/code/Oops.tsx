import withLocation from "@src/components/withLocation";
import Button from "@src/components/Button";
import Translate from "@src/components/translation/Translate";
import Container from "@src/components/mobile/Container";
import { Box, Flex } from "@src/components/Boxes";
import { Text } from "@src/components/Text";
import React from "react";
import { Link } from "gatsby";
import useMetric from "@src/utils/useMetric";
import mojoOops from "@src/assets/images/mobile-www/mojo-oops@2x.png";

function CodeErrorFooter({ prevLink }: { prevLink: string }) {
  return (
    <div style={{ textAlign: "center", marginTop: "1rem" }}>
      <Button as={Link} to={prevLink}>
        <Translate path="codes.oops.try_again" />
      </Button>
      <div style={{ marginBottom: "1rem" }} />
      <Translate path="codes.oops.need_help" />
      <a href="mailto:support@classdojo.com">
        <Translate path="codes.oops.email_us" />
      </a>
    </div>
  );
}

function getTitleAndMessage(
  prevLink: string,
  errorType: "invalidStudentCode" | "invalidClassCode" | "loggedInAsTeacher",
) {
  switch (errorType) {
    case "invalidStudentCode":
      return {
        title: <Translate path="codes.oops.title_invalid_code" />,
        msg: <CodeErrorFooter prevLink={prevLink} />,
      };

    case "invalidClassCode":
      return {
        title: <Translate path="codes.oops.title_invalid_code" />,
        msg: <CodeErrorFooter prevLink={prevLink} />,
      };

    case "loggedInAsTeacher":
      return {
        title: <Translate path="codes.oops.title_default_error" />,
        msg: <Translate path="codes.oops.you_are_teacher" />,
      };

    default:
      return {
        title: <Translate path="codes.oops.title_default_error" />,
        msg: (
          <Link to={prevLink}>
            {" "}
            <Translate path="codes.oops.go_back" />
          </Link>
        ),
      };
  }
}

const Oops = withLocation(
  ({ error, prevLink }: { error: "invalidClassCode" | "loggedInAsTeacher" | "invalidCode"; prevLink: string }) => {
    const errorType = error === "invalidCode" ? "invalidStudentCode" : error;

    const { title, msg } = getTitleAndMessage(prevLink, errorType);

    useMetric(`lite.codes.oops.${errorType}`);

    return (
      <Container>
        <Flex justifyContent="center" textAlign="center" flexDirection="column">
          <Text fontSize="20px" fontWeight={700} my="0.8rem">
            {title}
          </Text>
          <img
            alt=""
            src={mojoOops}
            style={{
              margin: "2rem auto",
              width: "100%",
              maxWidth: "50%",
            }}
          />
          <Box>{msg}</Box>
        </Flex>
      </Container>
    );
  },
);

export default Oops;
