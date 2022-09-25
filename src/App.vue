<template>
    <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
            <component :is="Component"/>
        </transition>
    </router-view>
</template>

<script setup lang="ts">
</script>

<style>
html, body, #app {
    height: 100%;
    margin: 0;
    font-family: "Sarasa Mono TC", Arial, HarmonyOS_Regular, Helvetica Neue, Microsoft YaHei, sans-serif !important;
}
</style>
