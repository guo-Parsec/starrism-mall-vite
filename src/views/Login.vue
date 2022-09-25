<template>
    <div class="flex-main-container">
        <div class="main-background"/>
        <div class="login-container">
            <el-card shadow="hover" class="login-card">
                <template #header>
                    <div class="title-img">
                        <img alt="starrism" style="width: 25%" src="/public/icon.svg">
                    </div>
                    <div class="title-text">
                        <span>Starrism</span>
                    </div>
                </template>
                <el-form :model="loginData" ref="loginFormRef" :rules="loginFormRules" status-icon>
                    <el-form-item prop="username">
                        <el-input v-model="loginData.username" clearable placeholder="请输入用户名"/>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input v-model="loginData.password" clearable placeholder="请输入密码"
                                  type="password" maxlength="16" show-password/>
                    </el-form-item>
                </el-form>
                <el-button @click="login(loginFormRef)" class="login-btn" type="primary">登录</el-button>
            </el-card>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import useStore from '@/store';
import { useRouter } from 'vue-router'

const router = useRouter()

const store = useStore();

const loginFormRef = ref<FormInstance>();

const loginFormRules = reactive<FormRules>({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' }
    ]
});

const loginData = reactive<auth.UserLoginDto>({
    username: '',
    password: ''
});

function login(formEl: FormInstance | undefined) {
    if (!formEl) return;
    formEl.validate(valid => {
        if (valid) {
            store.auth.login(loginData);
        }
    });
}
</script>

<style scoped>

</style>