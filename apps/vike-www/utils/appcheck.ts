import { useEffect } from "react";
import window from "global/window";

export default function appcheck() {
  const delay = 1500,
    OSs = {
      android: {
        storePrefix: "market://details?id=",
        test: /Android/i,
      },

      iOS: {
        storePrefix: "https://itunes.apple.com/app/id",
        test: /iPhone|iPad|iPod/i,
      },

      windows: {
        storePrefix: "zune:navigate?appid=",
        test: /Windows Phone|IEMobile/i,
      },
    };

  // Get user agent
  const getUserAgent = function () {
    for (const k in OSs) {
      if (navigator.userAgent.match(OSs[k].test)) return k;
    }
    return "";
  };

  // Get current time in ms
  const getTime = function () {
    return new Date().getTime();
  };

  const open = function (url) {
    window.location.replace(url);
  };

  // Parse a single element
  const parseElement = function (el) {
    let clicked = false;
    let timeout;
    const OS = getUserAgent();
    const OSAttr = OS.toLowerCase();
    const href = el.getAttribute("href");
    const app = el.getAttribute("data-app-" + OSAttr) || el.getAttribute("data-app");
    const store = el.getAttribute("data-store-" + OSAttr) || el.getAttribute("data-store");

    if (!app) return;
    if (!href) el.setAttribute("href", app);
    if (!OS) {
      window.location.href = document.getElementById("app-trigger").getAttribute("href");
    }

    if (OS && app) {
      // Hijack click event
      el.onclick = function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();

        // Store start time
        const start = getTime();
        clicked = true;

        // Timeout to detect if the link worked
        timeout = setTimeout(function () {
          // Check if any of the values are unset
          if (!clicked || !timeout) return;

          // Get current time
          const now = getTime();

          // Reset things
          clicked = false;
          timeout = null;

          // Has the user left the screen? ABORT!
          if (now - start >= delay * 2) return;

          // Open store or original link
          if (store) open(OSs[OS].storePrefix + store);
          else if (href) open(href);
        }, delay);

        // Go to app
        const win = open(app);
      };
    } else if (!href || href === "#") {
      // Apps are presumably not supported
      el.style.display = "none";
    }

    function reset() {
      if (!clicked || !timeout) return;
      // Reset everything
      clearInterval(timeout);
      timeout = undefined;
      clicked = false;
    }

    function onVisibilityChange() {
      if (document.hidden) reset();
    }

    document.addEventListener("visibilitychange", onVisibilityChange);

    return function cleanup() {
      reset();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  };

  const elements = document.getElementsByTagName("a");
  let i = elements.length;

  while (i--) parseElement(elements[i]);

  document.getElementById("app-trigger").click();
}

export function useAppcheck() {
  useEffect(() => {
    return appcheck();
  }, []);
}
