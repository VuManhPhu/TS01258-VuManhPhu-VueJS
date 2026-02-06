<template>
  <div v-if="post" class="row">
    <div class="col-md-8 offset-md-2">
      <img v-if="post.image" :src="post.image" class="img-fluid mb-3 rounded" style="width:100%; max-height: 400px; object-fit: cover;">
      <h1 class="mb-3">{{ post.title }}</h1>
      <div class="text-muted mb-4">Đăng ngày: {{ post.date || 'Hôm nay' }}</div>
      <div class="content mb-5" style="white-space: pre-line;">
        {{ post.content }}
      </div>

      <hr>

      <div class="comments-section mt-4">
        <h3>Bình luận ({{ post.comments ? post.comments.length : 0 }})</h3>
        
        <div v-if="post.comments && post.comments.length > 0" class="list-group mb-4">
          <div v-for="(comment, index) in post.comments" :key="index" class="list-group-item">
            <strong>{{ comment.user }}</strong>: {{ comment.text }}
          </div>
        </div>
        <div v-else class="alert alert-light text-center">Chưa có bình luận nào.</div>

        <div v-if="currentUser" class="card bg-light">
          <div class="card-body">
            <h5 class="card-title">Viết bình luận của cậu</h5>
            <textarea v-model="newComment" class="form-control mb-2" rows="3" placeholder="Chia sẻ suy nghĩ..."></textarea>
            <button @click="addComment" class="btn btn-primary">Gửi bình luận</button>
          </div>
        </div>
        <div v-else class="alert alert-warning">
          Vui lòng <router-link to="/login">đăng nhập</router-link> để bình luận.
        </div>
      </div>
    </div>
  </div>
  <div v-else class="text-center mt-5">Loading...</div>
</template>

<script>
export default {
  data() {
    return {
      post: null,
      currentUser: null,
      newComment: ''
    }
  },
  created() {
    this.loadPost();
    this.checkUser();
  },
  methods: {
    checkUser() {
      const user = localStorage.getItem('currentUser');
      this.currentUser = user ? JSON.parse(user) : null;
    },
    loadPost() {
      const postId = this.$route.params.id;
      const posts = JSON.parse(localStorage.getItem('posts')) || [];
      // Tìm bài viết theo ID
      this.post = posts.find(p => p.id == postId);
      
      // Khởi tạo mảng comments nếu chưa có
      if (this.post && !this.post.comments) {
        this.post.comments = [];
      }
    },
    addComment() {
      if (!this.newComment.trim()) return;

      const commentData = {
        user: this.currentUser.name || this.currentUser.email,
        text: this.newComment
      };

      // Thêm vào danh sách hiển thị
      this.post.comments.push(commentData);

      // Lưu cập nhật vào LocalStorage
      const posts = JSON.parse(localStorage.getItem('posts')) || [];
      const index = posts.findIndex(p => p.id == this.post.id);
      if (index !== -1) {
        posts[index].comments = this.post.comments;
        localStorage.setItem('posts', JSON.stringify(posts));
      }

      this.newComment = ''; // Xóa ô nhập
    }
  }
}
</script>