<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-info mb-0 shadow fw-bold">
    <div class="container">
      <router-link class="navbar-brand text-white" to="/">
        <i class="bi bi-stars me-1"></i>Creative Blog
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      
      <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
        <ul class="navbar-nav bg-white rounded-pill px-3 py-1 shadow-sm my-2 my-lg-0">
          <li class="nav-item">
            <router-link class="nav-link text-dark px-3 active" to="/">Home</router-link>
          </li>
           <li class="nav-item" v-if="currentUser">
            <router-link class="nav-link text-dark px-3" to="/profile">Profile</router-link>
          </li>
          <li class="nav-item" v-if="currentUser">
             <router-link class="nav-link text-primary px-3" to="/create">Create Post</router-link>
          </li>
        </ul>
      </div>

      <div class="d-flex align-items-center">
          <div v-if="!currentUser">
            <router-link class="btn btn-light btn-sm me-2 text-info fw-bold shadow-sm" to="/login">Login</router-link>
             <router-link class="btn btn-outline-light btn-sm" to="/register">Register</router-link>
          </div>
          <div v-if="currentUser" class="dropdown">
             <button class="btn btn-light btn-sm dropdown-toggle text-info shadow-sm" type="button" data-bs-toggle="dropdown">
               Hello, {{ currentUser.name }}
            </button>
            <ul class="dropdown-menu dropdown-menu-end dropdown-menu-dark bg-dark">
              <li><a class="dropdown-item text-info" href="#" @click="logout">Logout</a></li>
            </ul>
          </div>
      </div>
    </div>
  </nav>

  <div class="dark-theme-wrapper bg-dark text-light py-5" style="min-height: 100vh;">
    <div class="container">
      <router-view @auth-change="checkLogin" />
    </div>
  </div>
</template>

<script>
export default {
  data() { return { currentUser: null } },
  created() { this.checkLogin(); },
  methods: {
    checkLogin() {
      const user = localStorage.getItem('currentUser');
      this.currentUser = user ? JSON.parse(user) : null;
    },
    logout() {
      localStorage.removeItem('currentUser');
      this.currentUser = null;
      this.$router.push('/login');
    }
  }
}
</script>

<style>
/* Style toàn cục cho dark theme */
body, html {
    background-color: #212529; /* Màu bg-dark của bootstrap */
    color: #f8f9fa;
}
.card {
    background-color: #343a40; /* Màu card tối hơn chút */
    color: #fff;
    border: 1px solid #495057;
}
/* Ghi đè màu chữ trong các form input cho dễ nhìn trên nền tối */
.form-control {
    background-color: #2b3035;
    border-color: #495057;
    color: #fff;
}
.form-control:focus {
  background-color: #2b3035;
    color: #fff;
    box-shadow: 0 0 0 0.25rem rgba(13, 202, 240, 0.25); /* Màu cyan shadow */
}
</style>