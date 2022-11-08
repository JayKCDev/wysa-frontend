import { useRef, useState, useEffect, useCallback } from "react";

export const useHttpRequestClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const activeHttpRequests = useRef([]);

  const sendHttpRequest = useCallback(
    async (url, method = "GET", headers = {}, body = null) => {
      setIsLoading(true);
      const httpAbortCtrl = new AbortController();
      activeHttpRequests.current.push(httpAbortCtrl);
      try {
        const response = await fetch(url, {
          method,
          headers,
          body,
          signal: httpAbortCtrl.signal,
        });
        const responseData = await response.json();
        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortCtrl
        );
        console.log(responseData);
        if (!response.ok) {
          // throw new Error(responseData.errorMessage);
          setError(responseData.message);
          setIsLoading(false);
          return new Error(responseData.message);
        }
        setIsLoading(false);
        return responseData;
      } catch (err) {
        console.log(err);
        setError(err.message);
        setIsLoading(false);
        throw err;
      }
    },
    []
  );

  const errorHandler = () => {
    setError(null);
  };

  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach((httpAbortCtrl) =>
        httpAbortCtrl.abort()
      );
    };
  }, []);

  return { isLoading, error, errorHandler, sendHttpRequest };
};
