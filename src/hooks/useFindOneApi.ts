import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

const apiUrl = import.meta.env.VITE_BASE_URL;

export const useFindOneApi = <T>({ endpoint, id, handleError }: FindOneApi) => {
  const [ready, setReady] = useState(true);
  const [data, setData] = useState<T>(null! as T);

  useEffect(() => {
    if (id) {
      setReady(false);
      axios
        .get(`${apiUrl}/${endpoint}/${id}`)
        .then((response: AxiosResponse) => setData(response.data || null!))
        .catch((err) => {
          console.log(err);
          handleError?.(err?.response);
        })
        .finally(() => setReady(true));
    }
  }, [id]);
  return { ready, data };
};
