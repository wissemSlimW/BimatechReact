import axios from "axios";

const apiUrl = import.meta.env.VITE_BASE_URL;

export const useUpdateApi = <T>({
  endpoint,
  id,
  body = {},
  handleError,
  handleResponse,
  setReady,
}: UpdateApi<T>) => {
  setReady(false);
  axios
    .put(`${apiUrl}/${endpoint}${id ? "/" + id : ""}`, body)
    .then((response) => handleResponse?.(response))
    .catch((err) => {
      console.log(err);
      handleError?.(err?.response);
    })
    .finally(() => setReady(true));
};
