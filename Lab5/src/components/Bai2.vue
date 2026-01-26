<template>
  <div class="p-5 text-center">
    <input v-model="userInput" placeholder="Nhập dữ liệu vào đây" class="form-control mb-3" />
    <p>Giá trị bạn nhập: {{ userInput }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const userInput = ref('FPL');
</script>
