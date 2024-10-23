import Axios from "axios";
import { APIDomain } from "../APIDomain";

const axios = Axios.create({
  baseURL: APIDomain,
  withCredentials: true,
  headers: {
    "Access-Control-Allow-Credentials": true,
  },
});

export default axios;
