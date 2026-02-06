<template>
  <div class="row justify-content-center">
    <div class="col-md-6 col-lg-5">
      <div class="card shadow">
        <div class="card-body p-4">
          <h2 class="card-title text-center mb-4">Đăng ký</h2>
          
          <div v-if="errorMessage" class="alert alert-danger" role="alert">
            {{ errorMessage }}
          </div>

          <div v-if="successMessage" class="alert alert-success" role="alert">
            {{ successMessage }}
          </div>

          <form @submit.prevent="handleRegister">
            <div class="mb-3">
              <label for="name" class="form-label">Họ và tên</label>
              <input
                type="text"
                class="form-control"
                id="name"
                v-model="form.name"
                required
                placeholder="Nhập họ và tên"
              />
            </div>

            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input
                type="email"
                class="form-control"
                id="email"
                v-model="form.email"
                required
                placeholder="Nhập email của bạn"
              />
            </div>

            <div class="mb-3">
              <label for="password" class="form-label">Mật khẩu</label>
              <input
                type="password"
                class="form-control"
                id="password"
                v-model="form.password"
                required
                minlength="6"
                placeholder="Nhập mật khẩu (tối thiểu 6 ký tự)"
              />
            </div>

            <div class="mb-3">
              <label for="confirmPassword" class="form-label">Xác nhận mật khẩu</label>
              <input
                type="password"
                class="form-control"
                id="confirmPassword"
                v-model="form.confirmPassword"
                required
                placeholder="Nhập lại mật khẩu"
              />
            </div>

            <div class="mb-3">
              <label for="avatar" class="form-label">Ảnh đại diện (URL)</label>
              <input
                type="url"
                class="form-control"
                id="avatar"
                v-model="form.avatar"
                placeholder="https://example.com/avatar.jpg (tùy chọn)"
              />
            </div>

            <button
              type="submit"
              class="btn btn-primary w-100 mb-3"
              :disabled="loading"
            >
              <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
              Đăng ký
            </button>
          </form>

          <div class="text-center">
            <p class="mb-0">
              Đã có tài khoản?
              <router-link to="/login">Đăng nhập ngay</router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '../utils/auth.js'

const router = useRouter()
const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const form = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  avatar: ''
})

const handleRegister = async () => {
  loading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  // Validation
  if (form.password !== form.confirmPassword) {
    errorMessage.value = 'Mật khẩu xác nhận không khớp'
    loading.value = false
    return
  }

  if (form.password.length < 6) {
    errorMessage.value = 'Mật khẩu phải có ít nhất 6 ký tự'
    loading.value = false
    return
  }

  const result = authService.register({
    name: form.name,
    email: form.email,
    password: form.password,
    avatar: form.avatar
  })

  if (result.success) {
    successMessage.value = 'Đăng ký thành công! Đang chuyển đến trang đăng nhập...'
    setTimeout(() => {
      router.push('/login')
    }, 1500)
  } else {
    errorMessage.value = result.message
  }

  loading.value = false
}
</script>

<style scoped>
.card {
  border: none;
  border-radius: 10px;
}

.card-title {
  color: #333;
  font-weight: 600;
}
</style>
