<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-5">
       <h2 class="text-info display-6 fw-bold"><i class="bi bi-newspaper me-2"></i>News Feed</h2>
       <span class="badge bg-secondary">{{ posts.length }} posts</span>
    </div>
    
    <div class="d-flex flex-column gap-4">
      <div v-for="post in posts" :key="post.id" class="card mb-3 shadow-lg overflow-hidden border-0" style="max-width: 100%;">
        <div class="row g-0">
          <div class="col-md-4 position-relative" style="min-height: 200px;">
             <img :src="post.image || 'https://via.placeholder.com/400x300?text=Dark+Theme+Image'" class="img-fluid h-100 w-100" alt="..." style="object-fit: cover; position:absolute;">
          </div>
          <div class="col-md-8">
            <div class="card-body p-4">
              <div class="d-flex justify-content-between text-info small mb-2 fw-bold text-uppercase ls-1">
                 <span>{{ post.author || 'Admin' }}</span>
                 <span>{{ post.date }}</span>
              </div>
              <h3 class="card-title fw-bold mb-3">{{ post.title }}</h3>
              <p class="card-text text-light opacity-75">{{ post.content.substring(0, 120) }}...</p>
              <div class="d-flex justify-content-end mt-4">
                 <router-link :to="'/post/' + post.id" class="btn btn-info btn-sm text-dark fw-bold px-4 rounded-pill stretched-link">Read Article <i class="bi bi-arrow-right ms-1"></i></router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="posts.length === 0" class="p-5 text-center bg-dark rounded-3 border border-secondary">
      <h3 class="text-muted">Nothing here yet...</h3>
    </div>
  </div>
</template>

<script>
export default {
  data() { return { posts: [] } },
  created() {
    const postsData = localStorage.getItem('posts');
    this.posts = postsData ? JSON.parse(postsData) : [];
    this.posts.reverse();
  }
}
</script>

<style scoped>
/* CSS phụ trợ */
.ls-1 { letter-spacing: 1px; }
/* Hiệu ứng hover làm sáng card lên tí */
.card:hover {
   background-color: #3c424a;
   transition: background-color 0.3s;
}
</style>