<template>
  <div class="row justify-content-center">
    <div class="col-lg-8">
      <div class="card shadow">
        <div class="card-body p-4">
          <h2 class="card-title mb-4">Thông tin cá nhân</h2>

          <div v-if="errorMessage" class="alert alert-danger" role="alert">
            {{ errorMessage }}
          </div>

          <div v-if="successMessage" class="alert alert-success" role="alert">
            {{ successMessage }}
          </div>

          <div v-if="!currentUser" class="alert alert-warning" role="alert">
            Vui lòng đăng nhập để xem thông tin cá nhân
          </div>

          <div v-else>
            <!-- User Info Display -->
            <div class="text-center mb-4">
              <img
                v-if="currentUser.avatar"
                :src="currentUser.avatar"
                alt="Avatar"
                class="rounded-circle mb-3"
                style="width: 150px; height: 150px; object-fit: cover"
              />
              <h4>{{ currentUser.name }}</h4>
              <p class="text-muted">{{ currentUser.email }}</p>
            </div>

            <!-- Edit Form -->
            <form @submit.prevent="handleUpdate">
              <div class="mb-3">
                <label for="name" class="form-label">Họ và tên</label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  v-model="form.name"
                  required
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
                />
              </div>

              <div class="mb-3">
                <label for="avatar" class="form-label">Ảnh đại diện (URL)</label>
                <input
                  type="url"
                  class="form-control"
                  id="avatar"
                  v-model="form.avatar"
                  placeholder="https://example.com/avatar.jpg"
                />
                <div v-if="form.avatar" class="mt-2">
                  <img
                    :src="form.avatar"
                    alt="Preview"
                    class="img-fluid rounded"
                    style="max-height: 200px"
                    @error="form.avatar = ''"
                  />
                </div>
              </div>

              <div class="mb-3">
                <label for="currentPassword" class="form-label">Mật khẩu hiện tại</label>
                <input
                  type="password"
                  class="form-control"
                  id="currentPassword"
                  v-model="form.currentPassword"
                  placeholder="Nhập mật khẩu hiện tại để đổi mật khẩu"
                />
              </div>

              <div v-if="form.currentPassword" class="mb-3">
                <label for="newPassword" class="form-label">Mật khẩu mới</label>
                <input
                  type="password"
                  class="form-control"
                  id="newPassword"
                  v-model="form.newPassword"
                  minlength="6"
                  placeholder="Nhập mật khẩu mới (tối thiểu 6 ký tự)"
                />
              </div>

              <div v-if="form.newPassword" class="mb-3">
                <label for="confirmPassword" class="form-label">Xác nhận mật khẩu mới</label>
                <input
                  type="password"
                  class="form-control"
                  id="confirmPassword"
                  v-model="form.confirmPassword"
                  placeholder="Nhập lại mật khẩu mới"
                />
              </div>

              <button
                type="submit"
                class="btn btn-primary w-100"
                :disabled="loading"
              >
                <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                Cập nhật thông tin
              </button>
            </form>

            <!-- User's Posts -->
            <div class="mt-5">
              <h5 class="mb-3">Bài viết của tôi ({{ userPosts.length }})</h5>
              <div v-if="userPosts.length === 0" class="text-muted text-center py-3">
                Bạn chưa có bài viết nào
              </div>
              <div v-else class="list-group">
                <div
                  v-for="post in userPosts"
                  :key="post.id"
                  class="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <h6 class="mb-1">{{ post.title }}</h6>
                    <small class="text-muted">{{ formatDate(post.createdAt) }}</small>
                  </div>
                  <router-link
                    :to="`/post/${post.id}`"
                    class="btn btn-sm btn-outline-primary"
                  >
                    Xem
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '../utils/auth.js'
import { postService } from '../utils/posts.js'

const router = useRouter()
const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const currentUser = ref(null)
const userPosts = ref([])

const form = reactive({
  name: '',
  email: '',
  avatar: '',
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const loadUserData = () => {
  currentUser.value = authService.getCurrentUser()
  
  if (currentUser.value) {
    form.name = currentUser.value.name
    form.email = currentUser.value.email
    form.avatar = currentUser.value.avatar || ''
    userPosts.value = postService.getUserPosts(currentUser.value.id)
  } else {
    router.push('/login')
  }
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const handleUpdate = async () => {
  loading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  // Validate password change
  if (form.currentPassword && form.newPassword) {
    if (form.newPassword !== form.confirmPassword) {
      errorMessage.value = 'Mật khẩu xác nhận không khớp'
      loading.value = false
      return
    }

    if (form.newPassword.length < 6) {
      errorMessage.value = 'Mật khẩu mới phải có ít nhất 6 ký tự'
      loading.value = false
      return
    }

    // Verify current password
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const user = users.find(u => u.id === currentUser.value.id)
    
    if (!user || user.password !== form.currentPassword) {
      errorMessage.value = 'Mật khẩu hiện tại không đúng'
      loading.value = false
      return
    }
  }

  const updates = {
    name: form.name,
    email: form.email,
    avatar: form.avatar
  }

  if (form.newPassword) {
    updates.password = form.newPassword
  }

  const result = authService.updateProfile(currentUser.value.id, updates)

  if (result.success) {
    successMessage.value = 'Cập nhật thông tin thành công!'
    form.currentPassword = ''
    form.newPassword = ''
    form.confirmPassword = ''
    loadUserData()
    // Reload page to update navbar
    setTimeout(() => {
      window.location.reload()
    }, 1000)
  } else {
    errorMessage.value = result.message
  }

  loading.value = false
}

onMounted(() => {
  loadUserData()
})
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
