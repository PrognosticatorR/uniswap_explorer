import axios from 'axios';
import { useEffect, useState } from 'react';

function useFetch(url: string) {
  const [data, setData] = useState<any[] | []>([]);
  const [fetchingData, setFetchingData] = useState<boolean>(false);
  const [error, setError] = useState<null | string>(null);
  const authToken = localStorage.getItem('metamask:auth') ?? 'null';
  useEffect(() => {
    setFetchingData(true);
    setData([]);
    setError(null);
    const source = axios.CancelToken.source();
    axios
      .get(url, { headers: { Authorization: `Bearer ${JSON.parse(authToken)}` } })
      .then(res => {
        setFetchingData(false);
        res.data && setData(res?.data);
      })
      .catch(err => {
        setFetchingData(false);
        setError('Something went wrong!');
      });
    return () => {
      source.cancel();
    };
  }, [authToken, url]);

  return { data, fetchingData, error };
}
export default useFetch;
