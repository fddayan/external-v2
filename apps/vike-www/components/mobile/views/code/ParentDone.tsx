import withLocation from "@src/components/withLocation";
import Container from "@src/components/mobile/Container";
import { Flex } from "@src/components/Boxes";
import { Text } from "@src/components/Text";
import Translate from "@src/components/translation/Translate";
import GetTheApp from "@src/components/mobile/GetTheApp";
import React from "react";
import isMobile from "@src/utils/isMobile";
import useMetric from "@src/utils/useMetric";

function message(status: "now_connected" | "already_connected" | "other") {
  if (status === "now_connected") {
    return <Translate path="codes.parent_done.now_connected" />;
  } else if (status === "already_connected") {
    return <Translate path="codes.parent_done.already_connected" />;
  } else {
    return <Translate path="codes.parent_done.request_submitted" />;
  }
}

const ParentDone = withLocation(({ status }: { status: "now_connected" | "already_connected" | "other" }) => {
  useMetric("lite.codes.parent_done");

  if (!isMobile().any) {
    window.location.href = "https://home.classdojo.com";
  }

  return (
    <Container>
      <Flex textAlign="center" flexDirection="column" alignItems="center">
        <Text m="16px">{message(status)}</Text>
        <GetTheApp entityType="parent" />
      </Flex>
    </Container>
  );
});

export default ParentDone;
