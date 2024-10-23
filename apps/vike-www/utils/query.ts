import qs from "querystring";

const queryObj = typeof location !== "undefined" ? qs.parse(location.search.slice(1)) : {};

const get = (key) => queryObj[key];
const extend = (obj) => {
  let key, val;
  const copy = {};
  for (key in queryObj) {
    val = queryObj[key];
    copy[key] = val;
  }
  for (key in obj) {
    val = obj[key];
    copy[key] = val;
  }
  return copy;
};
const stringify = (obj) => qs.stringify(obj);

const query = {
  get,
  extend,
  stringify,
};
export default query;
