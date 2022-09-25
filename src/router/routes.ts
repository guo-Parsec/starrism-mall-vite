import type { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/Login.vue')
    },
    {
        path: '/layout',
        name: 'layout',
        component: () => import('@/views/Layout.vue'),
        children: [
            {
                path: '/workbench',
                name: 'workbench',
                component: () => import('@/views/Workbench.vue'),
            },
            {
                path: '/bms/user',
                name: 'user',
                component: () => import('@/views/bms/User.vue'),
            },
            {
                path: '/bms/role',
                name: 'role',
                component: () => import('@/views/bms/Role.vue'),
            }
        ]
    }
];

export default routes;

export const whiteList: Array<string> = ['/', '/login'];