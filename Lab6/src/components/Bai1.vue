<template>
  <div class="container mt-4">
    <h3>Nhập điểm trung bình:</h3>
    <input type="number" v-model.number="score" class="form-control mb-3" placeholder="Nhập điểm..." />

    <div v-if="score < 5.0" class="alert alert-danger">Xếp loại: Yếu</div>
    <div v-else-if="score < 6.5" class="alert alert-warning">Xếp loại: Trung bình</div>
    <div v-else-if="score < 8.0" class="alert alert-primary">Xếp loại: Khá</div>
    <div v-else-if="score < 9.0" class="alert alert-success">Xếp loại: Giỏi</div>
    <div v-else-if="score >= 9.0 && score <= 10" class="alert alert-info">Xếp loại: Xuất sắc</div>
    <div v-else class="text-danger">Điểm không hợp lệ!</div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const score = ref(0);
</script>