<template>
    <el-container class="main-container layout">
        <el-header height="80px" class="header">
            <head-menu></head-menu>
        </el-header>
        <el-container class="content">
            <el-aside class="aside">
            </el-aside>
            <el-main class="main">
                <router-view v-slot="{ Component }">
                    <transition name="fade" mode="out-in">
                        <component :is="Component"/>
                    </transition>
                </router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup lang="ts">
import HeadMenu from '@/components/layout/HeadMenu.vue';
import { ref } from 'vue';

const activeIndex = ref('1');
</script>

<style scoped>
::v-deep(.el-header) {
    --el-header-padding: 0 0;
    --el-header-height: 60px;
    padding: var(--el-header-padding);
    box-sizing: border-box;
    flex-shrink: 0;
    height: var(--el-header-height);
}

.layout {
    background-color: #f1f2f3;
}

.header {
    border-radius: 15px;
    background-color: #ffffff;
    margin: 14px 10px 4px 10px;
}

.aside {
    border-radius: 15px;
    background-color: #ffffff;
}

.main {
    background-color: #ffffff;
    margin-left: 10px;
    height: 100%;
    border-radius: 15px;
}

/*.child {*/
/*    background-color: #ffffff;*/
/*    height: 100%;*/
/*}*/

.content {
    margin: 10px;
}
</style>