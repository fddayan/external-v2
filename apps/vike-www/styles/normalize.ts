import { breakpoints, colors, font, fontSizes, lineHeights } from "./theme";
import { theme } from "@src/components/nessie-web";

export default `
  html {
    box-sizing: border-box;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  html {
    font-size: ${fontSizes[2]}px !important;
    line-height: ${lineHeights[3]} !important;
  }

  body {
    width: 100%;
    font-family: ${font};
    color: ${colors.text};
    background-color: ${colors.white};
    overflow-x: hidden;
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
  }

  a {
    color: ${theme.colors.dt_aqua50};
    text-decoration: none;
    cursor: pointer;
    &:hover,
    &:focus {
      text-decoration: none;
    }
  }

  img {
    max-width: 100%;
    object-fit: contain;
    position: relative;
  }

  figure {
    margin: 2rem 0;
  }

  figcaption {
    font-size: 80%;
  }

  table {
    width: 100%;
    margin-bottom: 1rem;
    border: 1px solid ${colors.gray};
    font-size: 85%;
    border-collapse: collapse;
  }

  td,
  th {
    padding: .25rem .5rem;
    border: 1px solid ${colors.gray};
  }

  th {
    text-align: left;
  }

  tbody {
    tr {
      &:nth-of-type(odd) {
        td {
          background-color: ${colors.lightGray};
        }
        tr {
          background-color: ${colors.lightGray};
        }
      }
    }
  }

  h1, h2, h3, h4, h5, h6 {
    margin-top: 1.414rem;
    margin-bottom: .5rem;
    color: ${colors.black};
    font-weight: 600;
    line-height: ${lineHeights[2]};
    text-rendering: optimizeLegibility;
  }

  h1 {
    margin-top: 0;
    font-size: ${fontSizes[7]}px;
  }

  h2 {
    font-size: ${fontSizes[6]}px;
  }

  h3 {
    font-size: ${fontSizes[5]}px;
  }

  h4, h5, h6 {
    font-size: ${fontSizes[4]}px;
  }

  p {
    margin-top: 0;
    margin-bottom: 1rem;
  }

  // strong {
  //   color: ${colors.black};
  // }

  ul,
  ol,
  dl {
    margin-top: 0;
    margin-bottom: 1rem;
  }

  dt {
    font-weight: bold;
  }

  dd {
    margin-bottom: .5rem;
  }

  hr {
    position: relative;
    margin: 1.5rem 0;
    border: 0;
    border-top: 1px solid ${colors.gray};
  }

  blockquote {
    margin: .8rem 0;
    padding: .5rem 1rem;
    border-left: .25rem solid ${colors.gray};
    color: ${colors.gray};

    p {
      &:last-child {
        margin-bottom: 0;
      }
    }

    @media (min-width: ${breakpoints[1]}) {
      padding-right: 5rem;
      padding-left: 1.25rem;
    }
  }
`;
