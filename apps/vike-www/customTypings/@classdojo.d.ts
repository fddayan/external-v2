declare module "@classdojo/web/nessie";
declare module "@classdojo/web/nessie/icons";

declare module "react-dock" {
  import * as React from "react";

  // minimal declaration to get it working in web,
  // declared properties are not exaustive, please add has needed
  const Dock: React.ComponentClass<{
    position?: string;
    fluid?: boolean;
    isVisible?: boolean;
    dimStyle?: React.CSSProperties;
    dimMode?: "none" | "transparent" | "opaque";
    children?: React.ReactNode;
    zIndex?: number;
  }>;

  export default Dock;
}
declare module "@classdojo/web/nessie/components/theme" {
  type NessieSpaceSizes = any;
  export { NessieSpaceSizes };
}

declare module "@classdojo/web/nessie/stylingLib" {
  const RAW_cssValue: (s: string) => string;
  export { RAW_cssValue };
}
