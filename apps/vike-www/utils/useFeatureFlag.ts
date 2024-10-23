import { useContext } from "react";
import _get from "lodash/get";
import { AppDataContext } from "@src/components/AppDataContext";
import { getFeatureSwitchOverride, getFeatureSwitchOverrides } from "@src/components/devTools/devToolsSettings";
import { isObject } from "lodash";
import { featureSwitches } from "./experiments/constants";
import { MobileDataContext } from "@src/components/mobile/MobileDataContext";

const DEFAULT_ON_STATE = false;

type FeatureFlag = {
  actualValue: string;
  on: boolean;
};

// Returns all the feature flags with the devTool overrides
export function useFeatureFlagsWithOverrides(): Record<(typeof featureSwitches)[number], string> | null {
  const isMobile = process.env.GATSBY_BUILD_WEBSITE === "mobile";
  const ctx: React.Context<{ data: { featureFlags: Record<string, string>; featureFlagsLoaded: boolean } }> = isMobile
    ? MobileDataContext
    : AppDataContext;
  const appData = useContext(ctx);
  const featureFlagsLoaded = appData.data.featureFlagsLoaded;

  if (!featureFlagsLoaded) return null;

  const data = appData.data.featureFlags;

  const featureSwitchOverrides = getFeatureSwitchOverrides();

  const allSwitchesWithOverrides =
    featureSwitchOverrides && isObject(data) ? { ...data, ...featureSwitchOverrides } : data;

  return allSwitchesWithOverrides;
}

// Returns a single feature flags with the devTool override
export function useFeatureFlag(name: string): FeatureFlag {
  const appData = useContext(AppDataContext);
  const flag = _get(appData.data, `featureFlags.${name}`);

  const featureFlagsLoaded = appData.data.featureFlagsLoaded;

  if (!featureFlagsLoaded) return { actualValue: "", on: false };
  const devToolsExperimentOverride = getFeatureSwitchOverride(name);
  if (flag) return { actualValue: devToolsExperimentOverride || flag, on: flag === "on" };
  else return { actualValue: flag, on: DEFAULT_ON_STATE };
}
