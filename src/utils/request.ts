import axios from 'axios';
import type {AxiosRequestConfig} from 'axios';
import { Toast } from 'vant'

const service = axios.create({
  baseURL: 'https://blue.planplus.cn',
  timeout: 40000,
  withCredentials: false,
})

function startLoading() {
  // 开始加载
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
  });
}

function endLoading() {
  // 结束加载
  Toast.clear()
}

// 设置请求拦截器
service.interceptors.request.use((req: any) => {
  startLoading()
  return req
}, function (error: any) {
  return Promise.reject(error);
})

// 设置响应拦截器
service.interceptors.response.use((res: any) => {
  endLoading()
  return res.data;
}, function (error: any) {
  return Promise.reject(error);
})

type CustomRequest = (config: AxiosRequestConfig) => Promise<{ data: any, code: number }>
type CustomRequest2 = (url: string, config?: AxiosRequestConfig) => Promise<{ data: any, code: number }>
const request = service as any as CustomRequest | CustomRequest2

export default request;