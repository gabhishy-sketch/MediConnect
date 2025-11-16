// small hook for GET requests
import { useState, useEffect } from "react";
import api from "../api/api";

export default function useFetch(url, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);
    api.get(url)
      .then(res => mounted && setData(res.data))
      .catch(err => mounted && setError(err))
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, deps); // eslint-disable-line

  return { data, loading, error };
}