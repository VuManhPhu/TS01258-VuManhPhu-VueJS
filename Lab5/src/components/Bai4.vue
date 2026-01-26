<template>
  <div class="container py-4">
    <h1 class="mb-4">Tạo bài viết mới</h1>
    <CreatePost @add-post="addPost" />
    <h2 class="mt-5">Danh sách bài viết</h2>
    <PostList :posts="posts" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import CreatePost from './CreatePost.vue';
import PostList from './PostList.vue';

const posts = ref([]);

function addPost(post) {
  posts.value.push(post);
}
</script>

<style>
body {
  font-family: Arial, sans-serif;
}
</style>
