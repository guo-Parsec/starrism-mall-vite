import axios from 'axios';
import type { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import useStore from '@/store';

export default class HttpInstance {
    instance: AxiosInstance;

    constructor(axiosConfig: AxiosRequestConfig) {
        this.instance = axios.create(axiosConfig);
        this.setInterceptor()
    }

    /** 设置请求拦截器 */
    setInterceptor() {
        this.instance.interceptors.request.use(
            config => {
                const handleConfig = { ...config };
                if (handleConfig.headers) {
                    // 数据转换
                    const contentType = handleConfig.headers['Content-Type'] as string;
                    const store = useStore()
                    // 设置token
                    if (store.auth.isLogin) {
                        handleConfig.headers[store.auth.tokenName] = "Bearer " + store.auth.accessToken;
                    }
                }
                return handleConfig;
            },
            (axiosError: AxiosError) => {
                //todo error处理
            }
        );
        this.instance.interceptors.response.use(
            response => {
                const { status } = response;
                if (status === 200 || status < 300 || status === 304) {
                    const dataResult = response.data;
                    if (dataResult['code'] === 200) {
                        // 请求成功处理
                        return response
                    }
                }
                return response;
            },
            (axiosError: AxiosError) => {
                //todo error处理
            }
        );
    }
}