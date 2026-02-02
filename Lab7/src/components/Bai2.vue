<template>
    <div class="container d-flex justify-content-center align-items-center my-5">
        <div class="card shadow p-4" style="width: 400px;">
            <div v-if="!isLoggedIn">
                <h4 class="text-center mb-4">Đăng nhập hệ thống</h4>
                <form @submit.prevent="login">
                    <div class="mb-3">
                        <input type="email" v-model="email" class="form-control" placeholder="Nhập email" />
                        <small v-if="emailError" class="text-danger">{{ emailError }}</small>
                    </div>
                    <div class="mb-3">
                        <input type="password" v-model="password" class="form-control" placeholder="Nhập mật khẩu" />
                        <small v-if="passwordError" class="text-danger">{{ passwordError }}</small>
                    </div>
                    <button type="submit" class="btn btn-primary w-100">Đăng nhập</button>
                </form>
            </div>

            <div v-else>
                <h4 class="text-center mb-4">Chào mừng, {{ email }}</h4>
                <button class="btn btn-danger w-100" @click="logout">Đăng xuất</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const isLoggedIn = ref(false);
const email = ref('');
const password = ref('');
const emailError = ref('');
const passwordError = ref('');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const login = () => {
    emailError.value = '';
    passwordError.value = '';

    if (!email.value) {
        emailError.value = 'Email là bắt buộc.';
    } else if (!emailRegex.test(email.value)) {
        emailError.value = 'Email không hợp lệ.';
    }

    if (!password.value) {
        passwordError.value = 'Mật khẩu là bắt buộc.';
    }

    if (!emailError.value && !passwordError.value) {
        isLoggedIn.value = true;
    }
};

const logout = () => {
    isLoggedIn.value = false;
    email.value = '';
    password.value = '';
};
</script>