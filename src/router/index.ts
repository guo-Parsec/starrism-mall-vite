import { createRouter, createWebHistory } from 'vue-router';
import routes, { whiteList } from '@/router/routes';
import useStore from '@/store';
import alert from '@/utils/alert';
import { storeToRefs } from 'pinia';


const router = createRouter({
    history: createWebHistory('starrism-mall'),
    routes
});


router.beforeEach((to, from, next) => {
    const store = useStore();
    const { isLogin } = storeToRefs(store.auth)
    if (!whiteList.includes(to.path)) {
        if (!isLogin.value) {
            alert.error('您尚未登录，请先登录系统');
            next('/');
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;