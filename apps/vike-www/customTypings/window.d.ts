declare module "global/window" {
  const navigator: any;
  const scrollTo: (opts: {
    top?: number;
    left?: number;
    behavior?: "smooth" | "instant" | "auto";
  }) => void;
  const scrollTo: (x: number, y: number) => void;
  const history: {
    pushState: (s: string, a: string, b: string) => void;
  };
  const isBrowserSupported: boolean;
  const __CD_UNSUPPORTED_BROWSER: boolean;
  const onerror: (
    msg: string,
    url: string,
    lineNo: string,
    colNo: string,
    error: any
  ) => Promise<void> | undefined;
  const addEventListener: (cbName: string, cb: (event: any) => void) => void;
  const removeEventListener: (cbName: string, cb: (event: any) => void) => void;
  const _paq: string[][];
  const location: Location;
  const errorCache: [string, string, string, string, any] | undefined;
  const innerWidth: number;
  const gtag: (
    command: string,
    targetId: string,
    eventParameters?: { [key: string]: any }
  ) => void;
  const fbq: (
    action: "track" | "init" | "trackCustom",
    eventNameOrPixelId: string,
    eventParameters?: { [key: string]: any }
  ) => void;
  const pintrk: (
    action: string,
    eventParameters?: { [key: string]: any } | string
  ) => void;
  const ttq: { track: (eventName: string, args: any) => void };
  const onLoad: (e: any) => void;
  const OneTrust:
    | {
        AllowAll: () => void;
        BlockGoogleAnalytics: (gaId: string, groupId: string) => void;
        Close: () => void;
        GetDomainData: () => string;
        InitializeBanner: () => void;
        InsertHtml: (
          element: string,
          selector: string,
          callback: () => void,
          options: {
            deleteSelectorContent: boolean;
            makeSelectorVisible: boolean;
            makeElementsVisible: boolean;
            deleteElements: boolean;
          },
          groupId: string
        ) => void;
        InsertScript: (
          url: string,
          selector: string,
          callback: () => void,
          options: {
            deleteSelectorContent: boolean;
            makeSelectorVisible: boolean;
            makeElementsVisible: boolean;
            deleteElements: boolean;
          },
          groupId: string,
          async: boolean
        ) => void;
        IsAlertBoxClosed: () => boolean;
        IsAlertBoxClosedAndValid: () => boolean;
        IsVendorServiceEnabled: () => boolean;
        LoadBanner: () => void;
        OnConsentChanged: (arg0: () => void) => void;
        RejectAll: () => void;
        SetAlertBoxClosed: () => void;
        ToggleInfoDisplay: () => void;
        TriggerGoogleAnalyticsEvent: (
          category: string,
          action: string,
          label: string,
          value: any
        ) => void;
      }
    | undefined;

  export default {
    scrollTo,
    history,
    isBrowserSupported,
    __CD_UNSUPPORTED_BROWSER,
    gtag,
    onerror,
    onLoad,
    addEventListener,
    removeEventListener,
    _paq,
    location,
    errorCache,
    innerWidth,
    gtag,
    fbq,
    pintrk,
    ttq,
    OneTrust,
    document,
    navigator,
  };
}
