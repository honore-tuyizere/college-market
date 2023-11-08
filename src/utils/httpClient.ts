import axios from "axios";

const ApiClient = () => {
  const instance = axios.create();
  instance.interceptors.request.use(async (request) => {
    const accessToken = localStorage.getItem("auth");
    if (accessToken) {
      request.headers.Authorization = `Bearer ${accessToken}`;
    }
    request.baseURL = import.meta.env.VITE_API_URL;
    return request;
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      return Promise.reject(error);
    },
  );
  return instance;
};

export default ApiClient();
