/*!
 * To modify this file, please see src/utils/blocker.ts.
 * Copyright (c) ClassDojo 2023
 */

const id = "browser-support-blocker";

// Clean up.
document.getElementById(id)?.remove();

const userAgentRegex = /./; // Do not modify as the regex will be generated at build-time.

const isBrowserSupported = userAgentRegex.test(window.navigator.userAgent);

window.isBrowserSupported = isBrowserSupported;

window.dispatchEvent(
  new CustomEvent("isbrowsersupported", {
    detail: { isBrowserSupported },
  }),
);

if (!isBrowserSupported) {
  const banner = document.createElement("div");
  banner.id = id;
  banner.style.position = "fixed";
  banner.style.top = "0px";
  banner.style.right = "0px";
  banner.style.left = "0px";
  banner.style.padding = "1rem";
  banner.style.display = "flex";
  banner.style.flexWrap = "wrap";
  banner.style.alignItems = "center";
  banner.style.justifyContent = "center";
  banner.style.gap = "1rem";
  banner.style.background = "#F7F8FF";
  banner.style.color = "#2C2A50";
  banner.style.textAlign = "center";
  banner.style.zIndex = "999999";

  const handleDismiss = () => {
    banner.remove();
  };

  banner.innerHTML = `<span><strong>Your web browser is not up to date.</strong> Update your browser for more security, speed and a better ClassDojo experience.</span><span><a href="https://classdojo.zendesk.com/hc/en-us/articles/202816825" target="_blank" rel="noopener" style="display:inline-block;padding:4px 12px;margin:2px;background:#00B2F7;border-radius:40px;color:#fff;">Update browser</a> <a href="#" style="display:inline-block;padding:4px 12px;margin:2px;background:#00B2F7;border-radius:40px;color:#fff;" onclick="handleDismiss()">Dismiss</a></span>`;

  document.body.appendChild(banner);
}
