<template>
    <div class="main-container">
        <el-row class="main-container" :gutter="80" justify="center" align="middle">
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
                    :ellipsis="false"
                    @select="handleSelect">
                    <el-sub-menu index="/bms/user">
                        <template #title>系统管理</template>
                        <el-menu-item index="/bms/user">用户管理</el-menu-item>
                        <el-menu-item index="/bms/role">角色管理</el-menu-item>
                    </el-sub-menu>
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
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { UserFilled, User, SwitchButton } from '@element-plus/icons-vue';
import useStore from '@/store';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const { nickname } = storeToRefs(store.auth);

const activeIndex = ref('/bms/user');
const handleSelect = (key: string, keyPath: string[]) => {
    console.log(key, keyPath);
};

function handleDropDownCommand(command: string | number | object) {
    if (command === 'logout') {
        store.auth.logout();
        store.auth.$reset()
        router.push('/');
    }
}

</script>

<style scoped>
.head-menu {
    height: 100%;
    font-family: PingFang SC, HarmonyOS_Regular, Helvetica Neue, Microsoft YaHei, sans-serif !important;
    font-weight: 600;
    font-style: normal;
}

.logo {
    height: 100%;
    font-family: SimSun, seriftitle, Helvetica Neue, Microsoft YaHei, sans-serif !important;
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
    font-family: Arial, serif;
    font-size: 15px;
    color: #323232;
}
</style>