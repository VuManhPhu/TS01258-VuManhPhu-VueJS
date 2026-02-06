# Blog App - Ứng dụng Quản lý Blog

Ứng dụng web quản lý blog được xây dựng bằng Vue.js và Bootstrap theo yêu cầu Assignment SOF308.

## Tính năng

### Y1 - Yêu cầu về tổ chức dự án
- ✅ Khởi tạo dự án VueJS với Vite
- ✅ Cài đặt và tích hợp Bootstrap 5
- ✅ Xây dựng giao diện các trang theo yêu cầu

### Y2 - Yêu cầu về hoàn thiện các chức năng
- ✅ **Đăng ký và đăng nhập**: Người dùng có thể tạo tài khoản mới và đăng nhập vào hệ thống
- ✅ **Đăng bài viết**: Người dùng đã đăng nhập có thể đăng bài viết mới với tiêu đề, nội dung và hình ảnh
- ✅ **Chỉnh sửa và xóa bài viết**: Người dùng có thể chỉnh sửa hoặc xóa bài viết của chính mình
- ✅ **Bình luận bài viết**: Người dùng đã đăng nhập có thể bình luận vào các bài viết
- ✅ **Quản lý thông tin cá nhân**: Trang profile cho phép xem và chỉnh sửa thông tin cá nhân, đổi mật khẩu

## Công nghệ sử dụng

- **Vue.js 3**: Framework JavaScript reactive
- **Vue Router 4**: Quản lý routing và navigation
- **Bootstrap 5**: Framework CSS cho giao diện responsive
- **Vite**: Build tool và dev server
- **LocalStorage**: Lưu trữ dữ liệu (users, posts, comments)

## Cài đặt và chạy

1. Cài đặt dependencies:
```bash
npm install
```

2. Chạy development server:
```bash
npm run dev
```

3. Build cho production:
```bash
npm run build
```

4. Preview production build:
```bash
npm run preview
```

## Cấu trúc dự án

```
asm/
├── src/
│   ├── components/          # Các Vue components
│   │   ├── Login.vue       # Trang đăng nhập
│   │   ├── Register.vue    # Trang đăng ký
│   │   ├── PostList.vue    # Danh sách bài viết
│   │   ├── PostDetail.vue  # Chi tiết bài viết
│   │   ├── CreatePost.vue  # Tạo/chỉnh sửa bài viết
│   │   └── Profile.vue      # Trang thông tin cá nhân
│   ├── router/
│   │   └── index.js        # Cấu hình Vue Router
│   ├── utils/
│   │   ├── auth.js         # Service xử lý authentication
│   │   └── posts.js        # Service xử lý posts và comments
│   ├── App.vue             # Component chính
│   ├── main.js             # Entry point
│   └── style.css           # Global styles
├── index.html
├── package.json
└── vite.config.js
```

## Các route

- `/` - Trang chủ (danh sách bài viết)
- `/login` - Đăng nhập
- `/register` - Đăng ký
- `/post/:id` - Chi tiết bài viết
- `/create-post` - Đăng bài mới (yêu cầu đăng nhập)
- `/edit-post/:id` - Chỉnh sửa bài viết (yêu cầu đăng nhập)
- `/profile` - Thông tin cá nhân (yêu cầu đăng nhập)

## Tính năng kỹ thuật đã áp dụng

- ✅ **Template Syntax**: Sử dụng Vue template với interpolation, directives
- ✅ **Data Binding**: Two-way binding với v-model
- ✅ **Reactivity**: Reactive data với ref và reactive
- ✅ **Conditional Rendering**: v-if, v-else, v-show
- ✅ **List Rendering**: v-for để hiển thị danh sách
- ✅ **Class và Style Binding**: Dynamic class và style binding
- ✅ **Form Binding**: v-model cho form inputs
- ✅ **Event Handling**: @click, @submit, @prevent
- ✅ **Vue Router**: Navigation, route guards, dynamic routes
- ✅ **Authentication**: Route protection, login/logout

## Lưu ý

- Dữ liệu được lưu trong LocalStorage của browser
- Mật khẩu được lưu dạng plain text (chỉ dùng cho demo, không dùng trong production)
- Ảnh đại diện và ảnh bài viết sử dụng URL từ internet

## Hướng dẫn sử dụng

1. **Đăng ký tài khoản mới**: Truy cập `/register` và điền thông tin
2. **Đăng nhập**: Truy cập `/login` với email và mật khẩu đã đăng ký
3. **Đăng bài viết**: Sau khi đăng nhập, click "Đăng bài" trên navbar
4. **Xem bài viết**: Click vào bài viết để xem chi tiết và bình luận
5. **Chỉnh sửa bài viết**: Trong trang chi tiết bài viết của bạn, click "Chỉnh sửa"
6. **Quản lý profile**: Click vào tên trên navbar và chọn "Thông tin cá nhân"
