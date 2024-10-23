import queryString from "query-string";
import { logEvent } from "@src/utils/logClient";

const logMarketingPageview = (location: Location): void => {
  const parsedLocation = queryString.parse(location.search);

  if (parsedLocation.utm_campaign) {
    logEvent({
      eventName: `pageview.referrer_link`,
      eventValue: parsedLocation.utm_campaign,
      metadata: parsedLocation,
    });
  }
};

export { logMarketingPageview };
