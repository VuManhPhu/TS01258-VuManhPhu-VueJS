<template>
  <div class="row justify-content-center">
    <div class="col-lg-8">
      <div class="card shadow">
        <div class="card-body p-4">
          <h2 class="card-title mb-4">
            {{ isEditMode ? 'Chỉnh sửa bài viết' : 'Đăng bài mới' }}
          </h2>

          <div v-if="errorMessage" class="alert alert-danger" role="alert">
            {{ errorMessage }}
          </div>

          <form @submit.prevent="handleSubmit">
            <div class="mb-3">
              <label for="title" class="form-label">Tiêu đề</label>
              <input
                type="text"
                class="form-control"
                id="title"
                v-model="form.title"
                required
                placeholder="Nhập tiêu đề bài viết"
              />
            </div>

            <div class="mb-3">
              <label for="content" class="form-label">Nội dung</label>
              <textarea
                class="form-control"
                id="content"
                v-model="form.content"
                rows="10"
                required
                placeholder="Nhập nội dung bài viết"
              ></textarea>
            </div>

            <div class="mb-3">
              <label for="image" class="form-label">Hình ảnh (URL)</label>
              <input
                type="url"
                class="form-control"
                id="image"
                v-model="form.image"
                placeholder="https://example.com/image.jpg (tùy chọn)"
              />
              <div v-if="form.image" class="mt-2">
                <img
                  :src="form.image"
                  alt="Preview"
                  class="img-fluid rounded"
                  style="max-height: 300px"
                  @error="form.image = ''"
                />
              </div>
            </div>

            <div class="d-flex justify-content-between">
              <router-link to="/" class="btn btn-secondary">
                Hủy
              </router-link>
              <button
                type="submit"
                class="btn btn-primary"
                :disabled="loading"
              >
                <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                {{ isEditMode ? 'Cập nhật' : 'Đăng bài' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { postService } from '../utils/posts.js'

const route = useRoute()
const router = useRouter()
const loading = ref(false)
const errorMessage = ref('')

const isEditMode = computed(() => {
  return !!route.params.id
})

const form = reactive({
  title: '',
  content: '',
  image: ''
})

const loadPost = () => {
  if (isEditMode.value) {
    const post = postService.getPostById(route.params.id)
    if (post) {
      form.title = post.title
      form.content = post.content
      form.image = post.image || ''
    } else {
      errorMessage.value = 'Bài viết không tồn tại'
    }
  }
}

const handleSubmit = async () => {
  loading.value = true
  errorMessage.value = ''

  let result
  if (isEditMode.value) {
    result = postService.updatePost(route.params.id, {
      title: form.title,
      content: form.content,
      image: form.image
    })
  } else {
    result = postService.createPost({
      title: form.title,
      content: form.content,
      image: form.image
    })
  }

  if (result.success) {
    router.push(`/post/${result.post.id}`)
  } else {
    errorMessage.value = result.message
    loading.value = false
  }
}

onMounted(() => {
  loadPost()
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
