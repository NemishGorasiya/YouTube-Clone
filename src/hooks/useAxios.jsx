import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";

export const useAxios = ({
  url,
  method = "get",
  headers = null,
  body = null,
}) => {
  const [response, setResponse] = useState({
    items: [],
  });
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  // const [nextPageToken, setNextPageToken] = useState(null);

  const tokenRef = useRef(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = tokenRef.current ? { pageToken: tokenRef.current } : {};
      const res = await axios[method](url, {
        params,
      });
      const resData = await res.data;
      setItems((prevItems) => [...prevItems, ...resData.items]);
      setResponse(resData);
      // setResponse((prevResponse) => ({
      //   ...resData,
      //   items: [...prevResponse.items, ...resData.items],
      // }));
    } catch (error) {
      setError(error);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [method, url]);

  const fetchMoreData = () => {
    fetchData();
    // setNextPageToken(response.nextPageToken);
    if (tokenRef.current) {
      tokenRef.current = response.nextPageToken;
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { response, error, isLoading, fetchMoreData, items };
};
