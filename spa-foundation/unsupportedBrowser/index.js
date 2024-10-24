const browserslist = require("browserslist");

// blocking IE <= 10, chrome <= 43, FF <= 45
// unfortunately have to specify numbers or else browser-update.org will provide defaults
const defaultBrowserVersions = {
  i: 10, // IE, blocks IE <= 10
  c: 43, // Chrome
  f: 45, // Firefox
  s: 7, // Safari
};

// given an array of browser + version strings, return the smallest version number as an integer
function getEarliestVersion(browserStrings) {
  const versions = browserStrings.map((str) => /\d+/.exec(str)[0]).map((str) => parseInt(str, 10));

  return Math.min(...versions);
}

// if the current repo has a browserslist config (e.g. package.json, .browserslistrc, etc)
// then use those browser versions to configure the browser blocker
let configuredBrowserVersions;
if (browserslist.findConfig(".")) {
  const supportedBrowsers = browserslist();
  const earliestIeVersion = getEarliestVersion(
    supportedBrowsers.filter((str) => str.includes("ie ") || str.includes("edge "))
  );
  const earliestFirefoxVersion = getEarliestVersion(supportedBrowsers.filter((str) => str.includes("firefox ")));
  const earliestOperaVersion = getEarliestVersion(supportedBrowsers.filter((str) => str.includes("opera ")));
  const earliestSafariVersion = getEarliestVersion(supportedBrowsers.filter((str) => str.includes("safari ")));
  const earliestChromeVersion = getEarliestVersion(supportedBrowsers.filter((str) => str.includes("chrome ")));

  configuredBrowserVersions = {
    i: earliestIeVersion - 1,
    f: earliestFirefoxVersion - 1,
    o: earliestOperaVersion - 1,
    s: earliestSafariVersion - 1,
    c: earliestChromeVersion - 1,
  };
}

const browserVersions = {
  ...defaultBrowserVersions,
  ...configuredBrowserVersions,
};

module.exports = browserVersions;
