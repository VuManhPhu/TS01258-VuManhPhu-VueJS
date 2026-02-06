<template>
  <div class="row justify-content-center">
    <div class="col-md-6">
      <div class="card">
        <div class="card-header">Đăng nhập</div>
        <div class="card-body">
          <form @submit.prevent="handleLogin">
            <div class="mb-3">
              <label class="form-label">Email</label>
              <input v-model="email" type="email" class="form-control" required>
            </div>
            <div class="mb-3">
              <label class="form-label">Mật khẩu</label>
              <input v-model="password" type="password" class="form-control" required>
            </div>
            <div v-if="error" class="alert alert-danger">{{ error }}</div>
            <button type="submit" class="btn btn-primary w-100">Đăng nhập</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
    handleLogin() {
      // Lấy danh sách user từ LocalStorage
      const users = JSON.parse(localStorage.getItem('users')) || [];
      
      // Tìm user khớp email và password
      const user = users.find(u => u.email === this.email && u.password === this.password);

      if (user) {
        // Lưu user đang đăng nhập
        localStorage.setItem('currentUser', JSON.stringify(user));
        // Báo cho App.vue biết để cập nhật menu
        this.$emit('auth-change');
        alert("Đăng nhập thành công!");
        this.$router.push('/');
      } else {
        this.error = "Email hoặc mật khẩu không đúng!";
      }
    }
  }
}
</script>