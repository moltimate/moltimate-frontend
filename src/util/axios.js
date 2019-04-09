import { useState, useEffect } from 'react';
const queryURL = 'http://localhost:8080/align/activesite';

const useAxios = (callback) => {
  const [result, setResults] = useState({});

  const useAsyncEndpoint = (fn) => {
    const [result, setResult] = useState({
      data: null,
      complete: false,
      pending: false,
      error: false
    });
    const [request, setRequest] = useState();

    useEffect(
      () => {
        if (!request) return;
        setResult({
          data: null,
          pending: true,
          error: false,
          complete: false
        });
        axios(request)
          .then(result =>
            setResult({
              data: result.data,
              pending: false,
              error: false,
              complete: true
            })
          )
          .catch(() =>
            setResult({
              data: null,
              pending: false,
              error: true,
              complete: true
            })
          );
      },
      [request]
    );

    return [result, (...args) => setRequest(fn(...args))];
  }

  const postQueryEndpoint = (e, data) => {
    /* eslint-disable react-hooks/rules-of-hooks */
    return useAsyncEndpoint(data => ({
      url: queryURL,
      method: "POST",
      data
    }));
  }

  return {
    postQueryEndpoint,
    result
  }
}

export default useAxios;
