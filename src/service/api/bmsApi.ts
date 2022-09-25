import { http } from '@/service/http';
import Alert from '@/utils/alert';

export const pageQuery = (dto: bms.BmsParamQuery): Promise<Service.PageData<bms.BmsParamVo>> => {
    return new Promise((resolve, reject) => {
        http.get<Service.PageData<bms.BmsParamVo>>('/admin/v1/bms/param/page', { params: dto }).then(res => {
            if (res.code === 200) {
                resolve(res.data as Service.PageData<bms.BmsParamVo>);
                Alert.success('查询成功', 2000);
            } else {
                Alert.error(res.message, 3000);
            }
        });
    });
};