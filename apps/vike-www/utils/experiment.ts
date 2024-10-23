import { useCallback, useEffect, useRef } from "react";
import { _logStartExperiment, _logConvertExperiment } from "@src/utils/logClient";
import { isProduction } from "@src/utils/env";
import { useFeatureFlag, useFeatureFlagsWithOverrides } from "./useFeatureFlag";
import { featureSwitches } from "./experiments/constants";

// to be called on mount in a component
export function useStartExperiment(experiment: string, overrideFS?: Record<string, string>): void {
  // const appData = useContext(AppDataContext);
  // const featureFlags = appData?.data?.featureFlags;
  const featureFlags = useFeatureFlagsWithOverrides();
  const hasStartedRef = useRef(false);

  useEffect(() => {
    if (hasStartedRef.current) return;

    if (!featureFlags || !Object.keys(featureFlags).length) {
      if (!isProduction()) {
        console.log(`failed trying to start experiment ${experiment} - feature flags not available yet`);
      }
      return;
    }

    if (!featureFlags[experiment]) {
      if (!isProduction()) {
        console.log(`no feature flag data to start experiment ${experiment}`);
      }
      return;
    }

    if (featureFlags[experiment] === "off") {
      !isProduction() && console.log(`cannot start experiment for feature switch ${experiment} with value of off`);
      return;
    }

    !isProduction() && console.log(`startExperiment for ${experiment}`);
    _logStartExperiment(experiment, { ...featureFlags, ...(overrideFS || {}) });
    hasStartedRef.current = true;
  }, [experiment, featureFlags, overrideFS]);
}

// defined along with any other hooks at the start of a component
// syntax is: top of file: const experimentNameConvert = useCreateConvertExperimentEvent(experimentName)
// in the onClick, or wherever you convert: experimentNameConvert()

export function useCreateConvertExperimentEvent(experiment: string): () => void {
  const featureFlags = useFeatureFlagsWithOverrides();

  if (!featureFlags || !Object.keys(featureFlags).length) {
    return () => {
      if (!isProduction()) {
        throw new Error(`failed trying to convert experiment ${experiment} - feature flags not available yet`);
      }
    };
  }

  if (!featureFlags[experiment]) {
    return () => {
      if (!isProduction()) {
        throw new Error(`no feature flag data for converting experiment ${experiment}`);
      }
    };
  }

  if (featureFlags[experiment] === "off") {
    return () => {
      !isProduction() && console.log(`cannot convert experiment for feature switch ${experiment} with value of off`);
    };
  }

  return () => {
    !isProduction() && console.log(`convertExperiment for ${experiment}`);
    _logConvertExperiment(experiment);
  };
}

export function useStartExperimentWhenInAudience(
  experiment: (typeof featureSwitches)[number],
  { isInAudience }: { isInAudience: boolean },
): string {
  const data = useFeatureFlagsWithOverrides();
  const variant = data?.[experiment];
  const handleError = (msg: string) => {
    if (!isProduction()) {
      throw new Error(msg);
    } else {
      console.error(msg);
    }
  };
  const hasStartedRef = useRef(false);
  useEffect(() => {
    if (hasStartedRef.current) return;
    if (!experiment) handleError(`Invalid experiment name: ${experiment}`);
    if (!data) return;

    // teachers without school ids dont fetch schoolid-based feature switches. Don't error on those.
    if (!data[experiment]) return handleError("Invalid experiment name");

    if (!isInAudience) {
      !isProduction() &&
        console.log(`cannot start experiment for feature switch ${experiment} as it is not in the audience`);
      return;
    }

    if (variant === "off") {
      !isProduction() && console.log(`cannot start experiment for feature switch ${experiment} with value of off`);
      return;
    }

    _logStartExperiment(experiment, data);
    !isProduction() && console.log(`startExperiment for ${experiment}`);
    hasStartedRef.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [experiment, isInAudience, data]);
  return isInAudience ? variant : "off";
}

export function useExperimentVariantWithExperimentStart({
  experiment,
  isInAudience,
  expectedVariant,
}: {
  experiment: (typeof featureSwitches)[number];
  isInAudience: boolean;
  expectedVariant: string;
}) {
  useStartExperimentWhenInAudience(experiment, {
    isInAudience,
  });
  const variant = useFeatureFlag(experiment);

  if (!isInAudience) {
    return false;
  }

  return variant.actualValue === expectedVariant;
}

function _startExperiment({
  experiment,
  data,
  variant,
}: {
  experiment: string;
  data: Record<string, string>;
  variant: string;
}): boolean {
  const handleError = (msg: string) => {
    if (!isProduction()) {
      throw new Error(msg);
    } else {
      // eslint-disable-next-line no-console
      console.error(msg);
    }
    return false;
  };
  if (!experiment) handleError(`Invalid experiment name: ${experiment}`);
  if (!data) return false;

  // teachers without school ids dont fetch schoolid-based feature switches. Don't error on those.
  if (!data[experiment]) return handleError("Invalid experiment name");

  if (variant === "off") {
    !isProduction() && console.log(`cannot start experiment for feature switch ${experiment} with value of off`);
    return false;
  }

  _logStartExperiment(experiment, data);
  !isProduction() && console.log(`startExperiment for ${experiment}`);
  return true;
}

export function useLazyStartExperiment(experiment: string): () => void {
  const data = useFeatureFlagsWithOverrides();
  const variant = data?.[experiment];

  const startExperiment = useCallback(() => {
    return _startExperiment({ experiment, data, variant });
  }, [data, experiment, variant]);

  return startExperiment;
}

export function useStartExperimentWhenInAudienceWithVariant(
  experiment: (typeof featureSwitches)[number],
  {
    isInAudience,
    variantOverride,
  }: {
    isInAudience: boolean;
    variantOverride?: string;
  },
): string {
  const data = useFeatureFlagsWithOverrides();
  const variant = variantOverride || data?.[experiment];
  const hasStartedRef = useRef(false);

  useEffect(() => {
    if (hasStartedRef.current) return;

    const handleError = (msg: string) => {
      if (!isProduction()) {
        throw new Error(msg);
      } else {
        console.error(msg);
      }
    };

    if (!experiment) {
      handleError(`Invalid experiment name: ${experiment}`);
      return;
    }

    if (!data) return;

    // Ensure the experiment exists in the feature flags
    if (!data[experiment]) {
      handleError("Invalid experiment name");
      return;
    }

    // Check if the user is in the audience
    if (!isInAudience) {
      !isProduction() && console.log(`Cannot start experiment ${experiment} as the user is not in the audience`);
      return;
    }

    // Check if the experiment is turned off
    if (variant === "off") {
      !isProduction() && console.log(`Cannot start experiment ${experiment} with variant value of "off"`);
      return;
    }

    // Log the experiment start with the variant or override
    _logStartExperiment(experiment, { ...data, [experiment]: variant });
    !isProduction() && console.log(`StartExperiment for ${experiment} with variant ${variant}`);

    hasStartedRef.current = true;
  }, [experiment, isInAudience, variant, data]);

  return isInAudience ? variant : "off";
}
