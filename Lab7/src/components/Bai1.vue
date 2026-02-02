<template>
    <div class="container">
        <h2>Quản lý công việc</h2>
        <form @submit.prevent="themCongViec">
            <input v-model="congViecMoi" class="form-control mb-2" placeholder="Nhập công việc" required />
            <button type="submit" class="btn btn-primary">Thêm công việc</button>
        </form>
        <ul class="list-group mt-3">
            <li v-for="(cv, index) in danhSachCongViec" :key="index"
                class="list-group-item d-flex justify-content-between">
                {{ cv }}
                <button class="btn btn-danger btn-sm" @click="xoa(index)">Xoá</button>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const congViecMoi = ref('');
const danhSachCongViec = ref([]);

const themCongViec = () => {
    if (congViecMoi.value.trim() !== '') {
        danhSachCongViec.value.push(congViecMoi.value);
        congViecMoi.value = '';
    }
};

const xoa = (index) => {
    danhSachCongViec.value.splice(index, 1);
};
</script>