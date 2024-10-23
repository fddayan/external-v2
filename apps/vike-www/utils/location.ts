// Perform a navigation to a URL
export const navigateTo = function (url: string) {
  // for testing navigation in Cypress
  if (window.Cypress && window.Cypress.navigateTo) {
    return window.Cypress.navigateTo(url);
  }
  window.location.assign(url);
};

export const subdomainLink = function (subdomain: string, path = "") {
  const base = origin()
    .replace("teach", subdomain)
    .replace("8084", subdomain === "home" ? "8085" : subdomain === "student" ? "8081" : "3579");
  return base + path;
};

export const origin = function () {
  return window.location.origin
    ? window.location.origin
    : `${window.location.protocol}//${window.location.hostname}${
        window.location.port ? `:${window.location.port}` : ""
      }`;
};
