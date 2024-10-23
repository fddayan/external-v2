import _random from "lodash/random";
import { logEvent } from "@src/utils/logClient";

const nextMidnight = new Date();
nextMidnight.setSeconds(_random(0, 59)); // stagger the refresh.
nextMidnight.setMinutes(_random(0, 30));
nextMidnight.setHours(0);
nextMidnight.setDate(nextMidnight.getDate() + 1);

function refresh() {
  if (Date.now() > nextMidnight.getTime()) {
    logEvent("external:midnight_refresh");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
}

export default (): void => {
  setInterval(refresh, 2000);
};
