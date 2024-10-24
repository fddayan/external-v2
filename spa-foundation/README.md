This directory used to contain a mini SPA framework. Most of the SPA functionality has been replaced by Next.js. What's remaining here is some SSL certs and some code for blocking unsupported browsers

- browser blocker based on `browserslist` inside your `package.json`
  - if a browser is being blocked, `window.unsupportedBrowser === true`
