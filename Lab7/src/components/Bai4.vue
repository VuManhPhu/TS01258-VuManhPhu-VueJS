<template>
    <div class="container">
        <LoginComponent v-if="!loggedIn" @login="onLogin" />
        <CommentComponent v-else :user="username" />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import LoginComponent from './LoginComponent.vue';
import CommentComponent from './CommentComponent.vue';

const loggedIn = ref(false);
const username = ref('');

const onLogin = (user) => {
    username.value = user;
    loggedIn.value = true;
};
</script>