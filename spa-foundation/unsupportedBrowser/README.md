The `unsupportedBrowser` renders an overlay when the user is using an outdated browser that links them to our helpdesk page. The helpdesk page explains to users what browsers they can use and where to download them.

# About

Our unsupported browser script has some constraints:

* The purpose of deprecating browsers is to move forward to new language features without compiling down or using polyfills. Our Webpack and Babel configs will output what newer browsers support. However, our unsupported browser script must support older browsers or else users won't see the unsupported browser message. Therefore, the unsupported browser JS and CSS won't go through the normal Webpack compilation pipeline, meaning you must write raw ES3 code and can't `require()` anything.
* Because the normal Webpack bundle may contain code that older browsers can't handle, the unsupported browser JS must live in a separate <script> tag to ensure the code will get evaluated. Otherwise, other app code might crash and prevent the unsupported browser code from running.

Given these constraints, the implementation plan is as follows:

* Write raw ES3 and CSS
* Determine which browsers to block via [browserslist](https://github.com/ai/browserslist), configured via each site's `package.json`. Provide a default set of browsers to block.

# Current usage

`index.html.ejs` adds the script tags to run browser sniffing code from browser-update.org.
`entry.js.val` adds our custom styles for the browser blocking banner