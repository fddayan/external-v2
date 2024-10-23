import React, { useContext } from "react";
import isMobile from "@src/utils/isMobile";
import Button from "@src/components/Button";
import { Box } from "@src/components/Boxes";
import { Text } from "@src/components/Text";
import { TranslationContext } from "@src/components/translation/TranslationContext";
import { EntityType } from "@src/utils/getSubdomainURL";

const GetTheApp = ({ entityType }: { entityType: EntityType }) => {
  const t = useContext(TranslationContext);

  if (isMobile().apple.device) {
    return (
      <div>
        <Text>{t.translate("codes.get_the_app.get_ios_app")}</Text>
        <a
          style={{ display: "block", textAlign: "center" }}
          href="https://itunes.apple.com/us/app/classdojo/id552602056"
        >
          <img
            style={{ maxWidth: "100%" }}
            alt={t.translate("codes.get_the_app.ios_alt") as string}
            src="https://static.classdojo.com/img/mobile-web/download-app-store.svg"
          />
        </a>
      </div>
    );
  }
  if (isMobile().android.device) {
    return (
      <div>
        <Text>{t.translate("codes.get_the_app.get_android_app")}</Text>
        <a href="https://play.google.com/store/apps/details?id=com.classdojo.android">
          <img
            style={{ maxWidth: "100%" }}
            alt={t.translate("codes.get_the_app.android_alt") as string}
            src="https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png"
          />
        </a>
      </div>
    );
  }
  return (
    <Box textAlign="center">
      <Button href={entityType === "student" ? "https://student.classdojo.com" : "https://home.classdojo.com"}>
        {t.translate("codes.get_the_app.go_to_account")}
      </Button>
    </Box>
  );
};

export default GetTheApp;
