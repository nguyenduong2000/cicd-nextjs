import axios, { InternalAxiosRequestConfig } from 'axios';

const createInstance = (
  baseUrl: string,
  middleware: (
    requestConfig: InternalAxiosRequestConfig
  ) => InternalAxiosRequestConfig[]
) => {
  const options = {
    baseURL: baseUrl,
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const instance = axios.create(options);

  instance.interceptors.request.use(
    async (requestConfig: InternalAxiosRequestConfig) => {
      await Promise.all(middleware(requestConfig));
      return requestConfig;
    },
    (requestError) => {
      return Promise.reject(requestError);
    }
  );

  // Add a response interceptor
  instance.interceptors.response.use(
    (response) => {
      const { data } = response;
      if (data.errors) {
        // hideLoadingPage()
        return Promise.reject(data);
      }
      if (data.error_msg) {
        // hideLoadingPage()
        return Promise.reject(data);
      }
      if (data?.data) {
        return data?.data;
      }
      return data;
    },
    (error) => {
      // hideLoadingPage()
      return Promise.reject(error);
    }
  );

  return instance;
};

export default createInstance;
