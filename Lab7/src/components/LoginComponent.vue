<template>
    <div class="container">
        <h3>Đăng nhập</h3>
        <form @submit.prevent="handleLogin">
            <input v-model="username" class="form-control mb-2" placeholder="Tên đăng nhập" required />
            <input v-model="password" type="password" class="form-control mb-2" placeholder="Mật khẩu" required />
            <button type="submit" class="btn btn-primary">Đăng nhập</button>
        </form>
    </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';

const username = ref('');
const password = ref('');
const emit = defineEmits(['login']);

const handleLogin = () => {
    if (username.value && password.value) {
        emit('login', username.value);
    }
};
</script>