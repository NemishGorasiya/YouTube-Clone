import { useState, useEffect } from "react";
import { httpRequest } from "../services/services";

const useFetch = (requestProps) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (requestProps.disabled) return;
    const abortController = new AbortController();
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await httpRequest({
          ...requestProps,
          abortController,
        });
        if (response) {
          setData(response);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => {
      abortController.abort();
    };
  }, [requestProps]);

  return { data, loading, error };
};

export default useFetch;
