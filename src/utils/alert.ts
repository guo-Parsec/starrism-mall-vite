import { ElNotification, NotificationParams } from 'element-plus';

function notification(options: NotificationParams) {
    ElNotification(options);
}

export default {
    info: (message: string, duration?: number) => ElNotification({
        title: '提示',
        message,
        type: 'info',
        duration: duration ? duration : 1000
    }),
    success: (message: string, duration?: number) => ElNotification({
        title: '成功',
        message,
        type: 'success',
        duration: duration ? duration : 1000
    }),
    warning: (message: string, duration?: number) => ElNotification({
        title: '警告',
        message,
        type: 'warning',
        duration: duration ? duration : 1000
    }),
    error: (message: string, duration?: number) => ElNotification({
        title: '错误',
        message,
        type: 'error',
        duration: duration ? duration : 1000
    }),
};
