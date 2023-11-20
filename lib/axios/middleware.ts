import LocalStorage from '@/utils/LocalStorage';
import { appConfig } from '@/utils/app-config';
import { InternalAxiosRequestConfig } from 'axios';

const excludeApi: string[] = [];

const withAuthToken = (requestConfig: InternalAxiosRequestConfig) => {
  const { url } = requestConfig;

  if (url && !excludeApi.includes(url)) {
    const authToken = LocalStorage.get(appConfig.accessTokenName);
    if (authToken) {
      requestConfig.headers.Authorization = `Bearer ${authToken}`;
      return requestConfig;
    }

    return requestConfig;
  }

  return requestConfig;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  auth: withAuthToken
};
