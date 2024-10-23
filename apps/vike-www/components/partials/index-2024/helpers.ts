import { logEvent } from "@src/utils/logClient";

export const logAnchorEvent = (event: string) => () => {
  logEvent({
    eventValue: window.location.href,
    eventName: `web.external_page.homepage-2024.link-${event}.click`,
  });
};
