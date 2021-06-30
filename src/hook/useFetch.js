import { useState, useEffect } from "react";

export default function useFetch(url, body, reqMethod) {
  const [data, setData] = useState([]);
  const [apiError, setError] = useState("");
  useEffect(() => {
    try {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var requestOptions =
        reqMethod === "GET"
          ? { headers: myHeaders }
          : {
              method: reqMethod,
              headers: myHeaders,
              body: JSON.stringify(body),
              redirect: "follow",
            };
      fetch(url, requestOptions)
        .then((response) => response.json())
        .then((data) => setData(data));
    } catch (e) {
      setError(e);
    }
  }, [body, url,reqMethod]);
  return data.length === 0
    ? {
        loading: true,
        data: null,
        apiError: null,
      }
    : {
        loading: false,
        data: data,
        apiError: apiError,
      };
}
