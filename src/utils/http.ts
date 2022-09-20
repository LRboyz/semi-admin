import { Toast } from '@douyinfe/semi-ui';
import axios, { AxiosInstance } from 'axios';

// 请求参数
export interface RequestParams {
  [key: string]: string | number;
}

const http = axios.create({
  baseURL: 'https://ucraobyasxwobmuvmdcy.supabase.co',
  timeout: 10000,
  headers: {
    'access-control-allow-origin': '*',
  },
});

http.interceptors.request.use((config) => {
  // Read token for anywhere, in this case directly from localStorage
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers!.Authorization = `Bearer ${token}`;
  }

  return config;
});

// response
http.interceptors.response.use(
  (response) => {
    return Promise.resolve(response.data);
  },
  (error) => {
    const errorJSON = error?.toJSON?.();
    const messageText = error.response?.data?.message || 'Error';
    const errorText =
      error.response?.data?.message || error.response?.data?.msg || error.response?.statusText || errorJSON?.message;
    const errorInfo = {
      ...errorJSON,
      config: error.config,
      request: error.request,
      response: error.response,
      code: error.code || error.response?.status,
      message: messageText,
    };

    Toast.error(`${errorText}`);
    // 如果是 401，即：登陆失败，则删除 token 并跳转到登陆页
    if (error.response.status === 401) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userData');
      // window.location.pathname = '/login';
    } else if (error.response.status === 403) {
      window.location.pathname = '/403/';
    }
    console.log(error, 'error');

    return Promise.reject(errorInfo);
  },
);

const service = {
  $: http,
  request: <T = unknown>(...args: Parameters<AxiosInstance['request']>): Promise<T> => http.request(...args),
  get: <T = unknown>(...args: Parameters<AxiosInstance['get']>): Promise<T> => http.get(...args),
  delete: <T = unknown>(...args: Parameters<AxiosInstance['delete']>): Promise<T> => http.delete(...args),
  head: <T = unknown>(...args: Parameters<AxiosInstance['head']>): Promise<T> => http.head(...args),
  options: <T = unknown>(...args: Parameters<AxiosInstance['options']>): Promise<T> => http.options(...args),
  post: <T = unknown>(...args: Parameters<AxiosInstance['post']>): Promise<T> => http.post(...args),
  put: <T = unknown>(...args: Parameters<AxiosInstance['put']>): Promise<T> => http.put(...args),
  patch: <T = unknown>(...args: Parameters<AxiosInstance['patch']>): Promise<T> => http.patch(...args),
};

export default service;
