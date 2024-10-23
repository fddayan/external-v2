import { DefaultTokenizer, Index, IndexProfile } from "flexsearch";
import { CSSProp } from "styled-components";

interface CSSModule {
  [className: string]: string;
}

// type shims for CSS modules

declare module "*.module.scss" {
  const cssModule: CSSModule;
  export = cssModule;
}

declare module "*.module.css" {
  const cssModule: CSSModule;
  export = cssModule;
}

// gatsby has webpack setup to import url string of the assets which are imported as modules like:
// import PlayButtonImage from '@src/assets/images/index/header-video-btn.svg'
// above declarations are added to prevent ts from complaining about "missing modules"
interface Error {
  status: string;
}
interface Global extends NodeJS.Global, Error {
  logs: {
    flush?: () => void;
    eventsOccurredInOrder: (events: string[]) => boolean;
    eventNames: () => any;
    getEventNames: () => string[];
  };
}
declare const global: Global;

declare module "*.mp4" {
  const value: string;
  export default value;
}

type FlexSearchIndexItem = {
  attrs: {
    depth: number;
    encode: IndexProfile;
    threshold: number;
    tokenize: DefaultTokenizer;
  };
  name: string;
  values: Index<number>;
};

export type FlexSearchStoreItem = {
  id: number;
  node: {
    for_website: string;
    publish_date: `${AAAA}-${MM}-${DD}`;
    slug: string;
    title: string;
  };
};
declare global {
  interface Window {
    sessionId: string | undefined;
    // maybe internet explorer
    MSStream?: any;
    __FLEXSEARCH__: {
      en: {
        index: FlexSearchIndexItem[];
        store: FlexSearchStoreItem[];
      };
    };
    isBrowserSupported?: boolean;
    Cypress?: {
      navigateTo: (url: string) => void;
    };
  }
}

// declare module "react" {
// interface Attributes {
// css?: CSSProp;
// }
// }
