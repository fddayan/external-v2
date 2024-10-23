import withLocation from "@src/components/withLocation";
import React, { useContext } from "react";
import Container from "@src/components/mobile/Container";
import { Flex } from "@src/components/Boxes";
import { TranslationContext } from "@src/components/translation/TranslationContext";
import Button from "@src/components/Button";
import { Text } from "@src/components/Text";
import { Link } from "gatsby";
import { MobileDataContext } from "@src/components/mobile/MobileDataContext";
import useMetric from "@src/utils/useMetric";

const StudentWriteDownUsername = withLocation(({ code }: { code: string }) => {
  const t = useContext(TranslationContext);
  const data = useContext(MobileDataContext);
  const nextScreen = `/sc/${code}/studentConsent`;
  useMetric("lite.codes.student_save_username");
  return (
    <Container>
      <Flex alignItems="start" textAlign="left" flexDirection="column">
        <Text fontWeight={600}>{t.translate("codes.student_write_down_username.welcome")}</Text>

        <span>{t.translate("codes.student_write_down_username.username_is")}</span>

        <h1 style={{ textAlign: "center" }}>{data.data.user && data.data.user.username}</h1>

        <p>{t.translate("codes.student_write_down_username.write_it_down")}</p>

        <Flex justifyContent="center" width="100%">
          <Button as={Link} to={nextScreen}>
            {t.translate("codes.student_write_down_username.wrote_it_down")}
          </Button>
        </Flex>
      </Flex>
    </Container>
  );
});

export default StudentWriteDownUsername;
