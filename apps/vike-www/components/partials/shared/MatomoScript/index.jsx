import React, { useEffect } from "react";

const MatomoScript = ({ performanceCookieConsent }) => {
  useEffect(() => {
    // @ts-ignore
    if (!window._paq) return;
  }, [performanceCookieConsent]);

  const isProd = process.env.GATSBY_ENV === "production";

  // _paq is Matomo activity metrics
  const matomoScript = `var _paq = window._paq = window._paq || [];
_paq.push(["setCookieDomain", "*.classdojo.com"]);
_paq.push(["setDomains", ["*.classdojo.com","*.blog.classdojo.com","*.ideas.classdojo.com","*.www2.classdojo.com","*.www3.classdojo.com"]]);
_paq.push(['setTrackerUrl', "/ma/m.cd"]);
_paq.push(['setSiteId', '1']);
_paq.push(['enableHeartBeatTimer']);
_paq.push(["requireCookieConsent"]);

window.start = new Date();

function startMetrics() {
  var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
  g.type='text/javascript'; g.async=true; g.src="/ma/m.js"; s.parentNode.insertBefore(g,s);
}
setTimeout(startMetrics, 1);`;
  const bottomOfPageScript = isProd ? `${matomoScript}` : "";

  const matomoNoScript = isProd ? (
    <noscript>
      <p>
        <img src={`/ma/m.cd?idsite=1&amp;rec=1`} style={{ border: 0 }} alt="metric" />
      </p>
    </noscript>
  ) : undefined;
  return (
    <>
      <script type="text/javascript" crossOrigin="anonymous" src="/browsersupportblocker.cd9f1603.min.js"></script>
      <script
        defer
        dangerouslySetInnerHTML={{
          __html: bottomOfPageScript,
        }}
      ></script>
      {matomoNoScript}
    </>
  );
};

export default MatomoScript;
