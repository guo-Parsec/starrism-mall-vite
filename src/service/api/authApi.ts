import { http } from '@/service/http';
import Alert from '@/utils/alert';
import { ElMessage  } from 'element-plus';

export const login = (dto: auth.UserLoginDto): Promise<auth.LoginUserData> => new Promise((resolve, reject) => {
    http.post<auth.LoginUserData>('/auth/login', dto).then(res => {
        if (res.code === 200) {
            resolve(res.data as auth.LoginUserData);
            Alert.success('登录成功');
        } else {
            Alert.error(res.message);
        }
    });
});