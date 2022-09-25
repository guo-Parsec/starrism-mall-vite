<template>

</template>

<script lang="ts" setup>
import useStore from '@/store';

const store = useStore();
store.layout.putActiveRoutePath()
</script>

<style scoped>

</style>