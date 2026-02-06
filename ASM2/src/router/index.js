import { createRouter, createWebHistory } from 'vue-router'
import PostList from '../components/PostList.vue'
import PostDetail from '../components/PostDetail.vue'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import CreatePost from '../components/CreatePost.vue'
import Profile from '../components/Profile.vue'

const routes = [
    { path: '/', component: PostList },
    { path: '/post/:id', component: PostDetail },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { 
        path: '/create', 
        component: CreatePost,
        meta: { requiresAuth: true } // Đánh dấu trang cần đăng nhập
    },
    { 
        path: '/profile', 
        component: Profile,
        meta: { requiresAuth: true }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// Kiểm tra đăng nhập trước khi vào route
router.beforeEach((to, from, next) => {
    const isLoggedIn = localStorage.getItem('currentUser');
    if (to.meta.requiresAuth && !isLoggedIn) {
        alert("Cậu cần đăng nhập để thực hiện chức năng này!");
        next('/login');
    } else {
        next();
    }
})

export default router;