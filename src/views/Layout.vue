<template>
    <el-container class="main-container layout">
        <el-header height="80px" class="header">
            <head-menu/>
        </el-header>
        <el-main class="main">
            <main-page/>

        </el-main>
    </el-container>
</template>

<script setup lang="ts">
import HeadMenu from '@/components/layout/HeadMenu.vue';
import MainPage from '@/components/layout/MainPage.vue';

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
    margin: 10px;
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