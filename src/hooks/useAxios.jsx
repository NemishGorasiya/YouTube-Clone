import { useCallback, useEffect, useState } from "react";
import axios from "axios";

export const useAxios = ({
  url,
  method = "get",
  headers = null,
  body = null,
}) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await axios[method](url, headers, body);
      setResponse(res.data);
    } catch (error) {
      setError(error);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [body, headers, method, url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { response, error, isLoading };
};
