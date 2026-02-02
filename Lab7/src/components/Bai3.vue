<template>
    <div class="container">
        <h2>Đăng ký người dùng</h2>
        <form @submit.prevent="submitForm" class="mb-3">
            <input v-model="form.hoten" type="text" class="form-control mb-2" placeholder="Họ tên" required />
            <input v-model="form.email" type="email" class="form-control mb-2" placeholder="Email" required />
            <input v-model="form.password" type="password" class="form-control mb-2" placeholder="Mật khẩu" required />
            <input v-model="form.ngaysinh" type="date" class="form-control mb-2" required />

            <select v-model="form.gioitinh" class="form-control mb-2">
                <option disabled value="">Chọn giới tính</option>
                <option>Nam</option>
                <option>Nữ</option>
                <option>Khác</option>
            </select>

            <div class="mb-2">
                <label>Ngôn ngữ:</label>
                <div>
                    <label><input type="checkbox" value="Tiếng Việt" v-model="form.ngonngu" /> Tiếng Việt</label>
                    <label class="ms-3"><input type="checkbox" value="English" v-model="form.ngonngu" /> English</label>
                </div>
            </div>

            <button type="submit" class="btn btn-success">Đăng ký</button>
        </form>

        <div v-if="submitted">
            <h4>Thông tin đã đăng ký:</h4>
            <p><strong>Họ tên:</strong> {{ form.hoten }}</p>
            <p><strong>Email:</strong> {{ form.email }}</p>
            <p><strong>Ngày sinh:</strong> {{ form.ngaysinh }}</p>
            <p><strong>Giới tính:</strong> {{ form.gioitinh }}</p>
            <p><strong>Ngôn ngữ:</strong> {{ form.ngonngu.join(', ') }}</p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const form = ref({
    hoten: '',
    email: '',
    password: '',
    ngaysinh: '',
    gioitinh: '',
    ngonngu: []
});

const submitted = ref(false);

const submitForm = () => {
    submitted.value = true;
};
</script>