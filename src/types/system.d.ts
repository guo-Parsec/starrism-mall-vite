declare namespace Service{
    /**
     * 请求的错误类型：
     * - axios: axios错误：网络错误, 请求超时, 默认的兜底错误
     * - http: 请求成功，响应的http状态码非200的错误
     * - backend: 请求成功，响应的http状态码为200，由后端定义的业务错误
     */
    type RequestErrorType = 'network' | 'http' | 'system';

    /** 请求错误 */
    interface RequestError {
        /** 请求服务的错误类型 */
        type: RequestErrorType;
        /** 错误码 */
        code: string | number;
        /** 错误信息 */
        msg: string;
    }

    /** 后端接口返回的数据结构配置 */
    interface CommonResult<T = any> {
        /** 表示后端请求状态码的属性字段 */
        code: number;
        /** 表示后端请求数据的属性字段 */
        message: string;
        /** 表示后端消息的属性字段 */
        data: T;
    }

    interface PageData<E> {
        pageSize: number,
        currPage: number,
        total: number,
        records: Array<E>
    }
}