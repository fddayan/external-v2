import React, { useContext } from "react";
import Container from "@src/components/mobile/Container";
import { Flex } from "@src/components/Boxes";
import { Text } from "@src/components/Text";
import mojoOops from "@src/assets/images/mobile-www/mojo-oops@2x.png";
import { TranslationContext } from "@src/components/translation/TranslationContext";
import useMetric from "@src/utils/useMetric";

export default function StudentBlocker() {
  useMetric("lite.codes.student_blocker");
  const t = useContext(TranslationContext);
  return (
    <Container>
      <Flex textAlign="center" flexDirection="column" alignItems="center">
        <img
          alt=""
          style={{
            maxWidth: "50%",
            margin: "0 auto 4rem",
            display: "block",
          }}
          src={mojoOops}
        />
        <Text margin="16px">{t.translate("codes.student_blocker.description")}</Text>
      </Flex>
    </Container>
  );
}
