import { http } from '@/service/http';
import Alert from '@/utils/alert';

/**
 * 登录系统
 * @param dto
 */
export const login = (dto: auth.UserLoginDto): Promise<auth.LoginUserData> => new Promise((resolve, reject) => {
    http.post<auth.LoginUserData>('/auth/login', dto).then(res => {
        if (res.code === 200) {
            resolve(res.data as auth.LoginUserData);
            Alert.success('登录成功', 4000);
        } else {
            Alert.error(res.message, 4000);
        }
    });
});

/**
 * 退出登录
 * @param userId
 */
export const logout = (userId: string): Promise<boolean> => new Promise(resolve => {
    http.post<boolean>(`/auth/logout?userId=${userId}`).then(res => {
        if (res.code === 200) {
            resolve(res.data as boolean);
            Alert.success('退出系统成功', 2000);
        } else {
            Alert.error(res.message);
        }
    });
});