import { sendException, incrementMetric } from "./logClient";
import { navigate } from "gatsby";

export default function navToError(err: Error) {
  incrementMetric("lite.error.crash");
  sendException(err, []);

  navigate("/apiError");
}
