<template>
    <div class="main-container">
        <el-row class="main-container" justify="center" align="middle">
            <el-col :span="4">
                <div class="logo">
                    <img alt="Starrism" src="/src/assets/img.png" style="width: 100%;">
                </div>
            </el-col>
            <el-col :span="16">
                <el-menu
                    :default-active="activeIndex"
                    router
                    class="head-menu"
                    mode="horizontal"
                    :ellipsis="false">
                    <template v-for="(menu,index) in menus" :key="index">
                        <el-menu-item @click="menuItemSelect(menu)" v-if="menu.isLeaf" :index="menu.index">{{ menu.label }}</el-menu-item>
                        <el-sub-menu v-if="!menu.isLeaf" :index="menu.children[0].index">
                            <template #title>{{ menu.label }}</template>
                            <template v-for="(childMenu,cIndex) in menu.children" :key="index + '-' + cIndex">
                                <el-menu-item @click="menuItemSelect(childMenu)" :index="childMenu.index">{{ childMenu.label }}</el-menu-item>
                            </template>
                        </el-sub-menu>
                    </template>
                </el-menu>
            </el-col>
            <el-col :span="4">
                <div class="avatar-list">
                    <el-dropdown @command="handleDropDownCommand">
                        <el-avatar :icon="UserFilled"/>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item disabled>
                                    <el-icon>
                                        <User/>
                                    </el-icon>
                                    {{ nickname }}
                                </el-dropdown-item>
                                <el-dropdown-item command="logout" divided>
                                    <el-icon>
                                        <SwitchButton/>
                                    </el-icon>
                                    退出系统
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
            </el-col>
        </el-row>
    </div>

</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { UserFilled, User, SwitchButton } from '@element-plus/icons-vue';
import useStore from '@/store';
import { useRouter, useRoute } from 'vue-router';
import layoutStore from '@/store/modules/layoutStore';

const store = useStore();
const router = useRouter();
const { nickname } = storeToRefs(store.auth);
const { currActiveRoutePath } = storeToRefs(store.layout);

const menus = reactive<Array<layout.MenuOption>>([
    {
        label: '工作台',
        index: '/workbench',
        isLeaf: true
    },
    {
        label: '系统管理',
        index: '/workbench',
        isLeaf: false,
        children: [
            {
                label: '用户管理',
                index: '/bms/user',
                isLeaf: true
            },
            {
                label: '角色管理',
                index: '/bms/role',
                isLeaf: true
            },
        ]
    },
]);

const activeIndex = currActiveRoutePath;
const menuItemSelect = (menuIem: layout.MenuOption) => {
    store.layout.putTabPane({
        name: menuIem.index,
        label: menuIem.label,
        closable: true
    })
};

function handleDropDownCommand(command: string | number | object) {
    if (command === 'logout') {
        store.auth.logout();
        store.auth.$reset();
        store.layout.$reset()
        router.push('/');
    }
}

</script>

<style scoped>
.head-menu {
    height: 100%;
    margin-left: 80px;
    /*font-family: PingFang SC, HarmonyOS_Regular, Helvetica Neue, Microsoft YaHei, sans-serif !important;*/
    font-weight: 600;
    font-style: normal;
}

.logo {
    height: 100%;
    /*font-family: SimSun, seriftitle, Helvetica Neue, Microsoft YaHei, sans-serif !important;*/
    font-size: 20px;
    font-weight: 600;
    font-style: italic;
    margin-left: 20px;
}

::v-deep(.el-menu--horizontal) {
    display: flex;
    flex-wrap: nowrap;
    border-bottom: 0;
    border-right: none;
}

.avatar-list {
    float: right;
    margin-right: 40px;
    /*font-family: Arial, serif;*/
    font-size: 15px;
    color: #323232;
}
</style>