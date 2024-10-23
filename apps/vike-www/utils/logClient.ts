import { ProductEvent } from "@classdojo/log-client/lib/client/client";
import * as eventRecorder from "../components/devTools/eventRecorder";

const haveWindow = typeof window !== `undefined`;

let logclient;

const getLogClient = async () => {
  if (!logclient) {
    logclient = await import("@classdojo/log-client");
  }
  return logclient;
};

const init = async (args) => {
  if (!haveWindow) return;
  const initializedClient = (await getLogClient()).init(args);
  eventRecorder.start();

  return initializedClient;
};

const logEvent = async (event) => {
  if (!haveWindow) return;
  return (await getLogClient()).logEvent(event);
};

const logMessage = async (logType, message) => {
  if (!haveWindow) return;
  return (await getLogClient()).logMessage(logType, message);
};

const setOnEvent = async (onEvent: (event: ProductEvent) => void): Promise<void> => {
  if (!haveWindow) return;

  (await getLogClient()).setOnEvent((event) => {
    onEvent(event);
  });
};

// DO NOT CALL DIRECTLY
// log the start of an experiment on mount using the useStartExperiment in src/utils/experiment
const _logStartExperiment = async (experiment, featureSwitches: Record<string, string>) => {
  if (!haveWindow) return;
  const logClient = await getLogClient();
  logClient.setFeatureSwitches(featureSwitches);
  logClient.setRoute(window.location.href);
  return logClient.logStartExperiment(experiment);
};

// DO NOT CALL DIRECTLY
// log the conversion event in your component by using useCreateConvertExperimentEvent from src/utils/experiment
// syntax is: top of file: const experimentNameConvert = useCreateConvertExperimentEvent(experimentName)
// in the onClick, or wherever you convert: experimentNameConvert()
const _logConvertExperiment = async (experiment) => {
  if (!haveWindow) return;
  return (await getLogClient()).logConvertExperiment(experiment);
};

const setEntityId = async (entityId) => {
  if (!haveWindow) return;
  return (await getLogClient()).setEntityId(entityId);
};

const setEntityType = async (userData) => {
  if (!haveWindow) return;

  let entityType;

  if (userData.type === "parent" || userData.type === "teacher") {
    entityType = userData.type;
  } else if (userData.student) {
    entityType = "studentUser";
  } else {
    entityType = "loggedOut";
  }

  return (await getLogClient()).setEntityType(entityType);
};

const setFeatureSwitches = async (featureSwitches) => {
  if (!haveWindow) return;
  return (await getLogClient()).setFeatureSwitches(featureSwitches);
};

const setFeatureSetId = async (featureSetId) => {
  if (!haveWindow) return;
  return (await getLogClient()).setFeatureSetId(featureSetId);
};

const getSessionId = async () => {
  if (!haveWindow) return;
  return (await getLogClient()).getSessionId();
};

const useGetSessionIdSync = (): string => {
  if (logclient) {
    return logclient.getSessionId();
  }
  return "";
};

const sendMetrics = async (metrics: any[]) => {
  if (!haveWindow) return;
  return (await getLogClient()).sendMetrics(metrics);
};

const incrementMetric = async (metricName) => {
  if (!haveWindow) return;
  return (await getLogClient()).sendMetrics([
    {
      type: "increment",
      value: 1,
      metricName: metricName,
    },
  ]);
};

const _logException = haveWindow
  ? (async () => {
      return (await getLogClient()).logException;
    })()
  : Promise.resolve((...args) => {
      console.error("LOG_EXCEPTION_NO_WINDOW:", ...args);
    });

const logException = async (...args) => {
  const f = await _logException;
  f(...args);
};

// give this a unique name from the underlying logClient.logException so autocomplete/autoimport
// works more accurately
const sendException = logException;

export {
  init,
  logEvent,
  logMessage,
  incrementMetric,
  setEntityId,
  getSessionId,
  useGetSessionIdSync,
  logException,
  sendException,
  setFeatureSetId,
  setOnEvent,
  _logStartExperiment,
  _logConvertExperiment,
  setFeatureSwitches,
  sendMetrics,
  setEntityType,
};
