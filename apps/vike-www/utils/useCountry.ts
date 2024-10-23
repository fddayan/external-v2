import { useEffect, useState } from "react";

const useCountry = () => {
  const [countryValue, setCountryValue] = useState("");
  useEffect(() => {
    fetch("/api/country", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((r) => r.json())
      .then((json) => setCountryValue(json.country));
  }, []);
  return countryValue;
};

export default useCountry;
