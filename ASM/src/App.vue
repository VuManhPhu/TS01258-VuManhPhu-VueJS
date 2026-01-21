<template>
  <div class="container">
    <nav class="navbar navbar-expand-lg navbar-light bg-light mb-4">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/">Poly Movie</router-link>
        <div class="navbar-nav">
          <router-link class="nav-link" to="/">Trang chủ</router-link>
          <router-link class="nav-link" to="/login">Đăng nhập</router-link>
          <router-link class="nav-link" to="/register">Đăng ký</router-link>
        </div>
      </div>
    </nav>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>