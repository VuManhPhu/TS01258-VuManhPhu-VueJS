<template>
  <div>
    <input
      v-model="title"
      class="form-control mb-2"
      placeholder="Tiêu đề bài viết"
    />
    <input
      v-model="author"
      class="form-control mb-2"
      placeholder="Tên tác giả"
    />
    <textarea
      v-model="content"
      class="form-control mb-2"
      rows="4"
      placeholder="Nội dung bài viết"
    ></textarea>
    <button @click="submitPost" class="btn btn-primary">Đăng bài</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Emit sự kiện từ component con
const emit = defineEmits(['add-post'])

// Khai báo biến reactive
const title = ref('')
const author = ref('')
const content = ref('')

// Hàm submit
function submitPost() {
  if (title.value && author.value && content.value) {
    const newPost = {
      title: title.value,
      author: author.value,
      content: content.value,
      backgroundColor: '#f9f9f9', // có thể tùy chỉnh theo style
      textColor: '#333'
    }

    emit('add-post', newPost)

    // Reset input
    title.value = ''
    author.value = ''
    content.value = ''
  } else {
    alert('Vui lòng nhập đầy đủ thông tin!')
  }
}
</script>

<style scoped>
input,
textarea {
  display: block;
  width: 100%;
  margin: 10px 0;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
}

button {
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
