import axios from "axios";
const apiUrl = import.meta.env.VITE_BASE_URL;

export const useRemoveApi = ({
  endpoint,
  id,
  handleError,
  handleResponse,
  setReady,
}: RemoveApi) => {
  setReady(false);
  axios
    .delete(`${apiUrl}/${endpoint}/${id}`)
    .then(async (response) => handleResponse?.(response))
    .catch((err) => {
      console.log(err);
      handleError?.(err?.response);
    })
    .finally(() => setReady(true));
};
