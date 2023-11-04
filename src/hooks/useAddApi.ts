import axios from "axios";
const apiUrl = import.meta.env.VITE_BASE_URL;

export const useAddApi = <T>({
  endpoint,
  body = {},
  handleError,
  handleResponse,
  setReady,
}: AddApi<T>) => {
  setReady(false);
  axios
    .post(`${apiUrl}/${endpoint}`, body)
    .then((response) => handleResponse?.(response))
    .catch((err) => {
      console.log(err);
      handleError?.(err?.response);
    })
    .finally(() => setReady(true));
};
