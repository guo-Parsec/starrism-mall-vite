import axios from 'axios';
import type { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';

export default class HttpInstance {
    instance: AxiosInstance;

    constructor(axiosConfig: AxiosRequestConfig) {
        this.instance = axios.create(axiosConfig);
    }

    /** 设置请求拦截器 */
    setInterceptor() {
        this.instance.interceptors.request.use(
            config => {
                const handleConfig = { ...config };
                if (handleConfig.headers) {
                    // 数据转换
                    const contentType = handleConfig.headers['Content-Type'] as string;
                    //todo handleConfig.data = await transformRequestData(handleConfig.data, contentType);
                    // 设置token
                    // todo handleConfig.headers.Authorization = getToken();
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
                console.log('1111',response);
                if (status === 200 || status < 300 || status === 304) {
                    const dataResult = response.data;
                    console.log('222',dataResult);
                    if (dataResult['code'] === 200) {
                        // 请求成功处理
                        return response.data
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