import { useState, useCallback, useEffect } from "react";
import { noop, omit } from "lodash/fp";
import { LocalStorageWrapper } from "@src/utils/localStorage";
import * as env from "@src/utils/env";

const _window = typeof window === "undefined" ? { location: null } : window;

//
// dev toolbar visibility
//
const setIsDevToolsEnabled = (value: string) => {
  LocalStorageWrapper.setItem("devTools.enable", value);
};

const getIsDevToolsEnabled = () => {
  return LocalStorageWrapper.getItem("devTools.enable") === "true" || false;
};

export const useIsDevToolsEnabled = (): { isDevToolsEnabled: boolean } => {
  let devToolsQSValue: string | null = env.isDev() ? "true" : null;
  if (_window.location?.href?.includes("dev-tools=true")) devToolsQSValue = "true";
  if (_window.location?.href?.includes("dev-tools=false")) devToolsQSValue = "false";

  if (devToolsQSValue) {
    setIsDevToolsEnabled(devToolsQSValue);
  }

  // tracks if dev tools should be displayed or not
  return { isDevToolsEnabled: getIsDevToolsEnabled() };
};

//
// dev toolbar window mode
//
const setIsNewWindow = (value: boolean) => {
  LocalStorageWrapper.setItem("devTools.isNewWindow", String(value));
};

const getIsNewWindow = () => {
  return LocalStorageWrapper.getItem("devTools.isNewWindow") === "true" || false;
};

const useIsNewWindow = (): { isNewWindow: boolean; setIsNewWindow: (value: boolean) => void } => {
  const [isNewWindow, setIsNewWindowState] = useState(getIsNewWindow());

  const _setIsNewWindow = useCallback((value: boolean) => {
    setIsNewWindowState(value);
    setIsNewWindow(value);
  }, []);

  return { isNewWindow, setIsNewWindow: _setIsNewWindow };
};

//
// dev toolbar panel dock position
//
export const PANEL_DISPLAY_SIDES = {
  Left: "left",
  Right: "right",
} as const;

const setPanelDisplaySide = (value: "left" | "right") => {
  LocalStorageWrapper.setItem("devTools.panelSide", value);
};

const getPanelDisplaySide = (): "left" | "right" => {
  return (LocalStorageWrapper.getItem("devTools.panelSide") as "left" | "right") || PANEL_DISPLAY_SIDES.Right;
};

const usePanelDisplaySide = (): {
  panelDisplaySide: "left" | "right";
  setPanelDisplaySide: (side: "left" | "right") => void;
} => {
  const [panelDisplaySide, setPanelDisplaySideState] = useState(getPanelDisplaySide());

  // `value` param should be one of `left` or `right`
  const _setPanelDisplaySide = useCallback((value: "left" | "right") => {
    setPanelDisplaySideState(value);
    setPanelDisplaySide(value);
  }, []);

  return { panelDisplaySide, setPanelDisplaySide: _setPanelDisplaySide };
};

//
// dev toolbar feature switch overrides
//

// list of event handlers registered to get called when a new event is logged.
// we need this so the feature switches section UI updates when we change a feature switch value
let onFeatureSwitchOverridesChangeHandlers: ((fsOverrides: Record<string, unknown>) => void)[] = [];

function addOnFeatureSwitchOverridesChangeHandler(handler: (fsOverrides: Record<string, unknown>) => void) {
  onFeatureSwitchOverridesChangeHandlers = [...onFeatureSwitchOverridesChangeHandlers, handler];

  return () => {
    onFeatureSwitchOverridesChangeHandlers = onFeatureSwitchOverridesChangeHandlers.filter((h) => h !== handler);
  };
}

function notifyOnFeatureSwitchOverridesChange(fsOverrides: Record<string, unknown>) {
  onFeatureSwitchOverridesChangeHandlers.forEach((handler) => handler(fsOverrides));
}

const setFeatureSwitchOverrides = (fsOverrides: Record<string, unknown>) => {
  LocalStorageWrapper.setItem("devTools.featureSwitchOverrides", JSON.stringify(fsOverrides));
  notifyOnFeatureSwitchOverridesChange(fsOverrides);
};

export const getFeatureSwitchOverrides = (): Record<string, string> => {
  try {
    const featureSwitchOverrides = LocalStorageWrapper.getItem("devTools.featureSwitchOverrides");
    return featureSwitchOverrides ? JSON.parse(featureSwitchOverrides) : {};
  } catch (e) {
    return {};
  }
};

export const getFeatureSwitchOverride = (experiment_name: string): string => {
  try {
    const featureSwitchOverrides = LocalStorageWrapper.getItem("devTools.featureSwitchOverrides");
    return featureSwitchOverrides ? JSON.parse(featureSwitchOverrides)[experiment_name] ?? "" : "";
  } catch (e) {
    return "";
  }
};

// Loads feature switch override values from localStorage and re-runs all existing
// hook instances when new overrides are saved.
// This is needed because featureSwitches pod uses one instance of this hook
// to load the override values, and the dev toolbar feature switches section uses
// another instance to set new values for the feature switches, so we need to trigger
// re-runs of all instances so that the dev toolbar feature switches section displays
// the updated values, otherwise, the user would select a value for the feature switch and
// the dev toolbar UI would not update.
const useFeatureSwitchOverrides = (): {
  featureSwitchOverrides: any;
  hasFeatureSwitchOverrides: boolean;
  setFeatureSwitchOverride: (switchName: string, value: string) => void;
  clearFeatureSwitchOverride: (switchId: string) => void;
  clearAllFeatureSwitchOverrides: () => void;
} => {
  const [featureSwitchOverrides, setFeatureSwitchOverridesState] = useState(getFeatureSwitchOverrides());

  useEffect(() => {
    // add event handler for when values change, so we update state and cause hook to re-run
    return addOnFeatureSwitchOverridesChangeHandler((fsOverrides: Record<string, string>) =>
      setFeatureSwitchOverridesState(fsOverrides),
    );
  }, []);

  const _setFeatureSwitchOverride = useCallback(
    (switchName: string, value: string) => {
      const updatedFeatureSwitchOverrides = {
        ...featureSwitchOverrides,
        [switchName]: value,
      };
      setFeatureSwitchOverridesState(updatedFeatureSwitchOverrides);
      setFeatureSwitchOverrides(updatedFeatureSwitchOverrides);
    },
    [featureSwitchOverrides],
  );

  const clearFeatureSwitchOverride = useCallback(
    (switchName: string) => {
      const updatedFeatureSwitchOverrides = omit([switchName], featureSwitchOverrides);
      setFeatureSwitchOverridesState(updatedFeatureSwitchOverrides);
      setFeatureSwitchOverrides(updatedFeatureSwitchOverrides);
    },
    [featureSwitchOverrides],
  );

  const clearAllFeatureSwitchOverrides = useCallback(() => {
    const updatedFeatureSwitchOverrides = {};
    setFeatureSwitchOverridesState(updatedFeatureSwitchOverrides);
    setFeatureSwitchOverrides(updatedFeatureSwitchOverrides);
  }, []);

  const hasFeatureSwitchOverrides = Object.keys(featureSwitchOverrides).length > 0;

  // we don't want to have feature switch overrides if user has disabled the dev tools
  // or doesn't have access to them, no matter what is stored in localStorage
  const { isDevToolsEnabled } = useIsDevToolsEnabled();
  if (!isDevToolsEnabled) {
    return {
      featureSwitchOverrides: {},
      hasFeatureSwitchOverrides: false,
      setFeatureSwitchOverride: noop,
      clearFeatureSwitchOverride: noop,
      clearAllFeatureSwitchOverrides: noop,
    };
  }

  return {
    featureSwitchOverrides,
    hasFeatureSwitchOverrides,
    setFeatureSwitchOverride: _setFeatureSwitchOverride,
    clearFeatureSwitchOverride,
    clearAllFeatureSwitchOverrides,
  };
};

export const DevToolsSettings = {
  useIsDevToolsEnabled,
  useIsNewWindow,
  usePanelDisplaySide,
  useFeatureSwitchOverrides,
};
