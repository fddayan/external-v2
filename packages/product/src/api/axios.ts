import Axios from "axios";

// const APIDomain = "https://api.classdojo.com";
// const APIDomain = "external.classdojo.test";

export const axios = Axios.create({
  // baseURL: APIDomain,
  withCredentials: true,
  headers: {
    "Access-Control-Allow-Credentials": true,
  },
});
