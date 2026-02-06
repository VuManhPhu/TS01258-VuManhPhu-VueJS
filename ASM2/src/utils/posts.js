// Posts utility functions
export const postService = {
  // Get all posts
  getAllPosts() {
    return JSON.parse(localStorage.getItem('posts') || '[]')
  },
  
  // Get post by ID
  getPostById(id) {
    const posts = this.getAllPosts()
    return posts.find(p => p.id === id)
  },
  
  // Create new post
  createPost(postData) {
    const posts = this.getAllPosts()
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null')
    
    if (!currentUser) {
      return { success: false, message: 'Bạn cần đăng nhập để đăng bài' }
    }
    
    const newPost = {
      id: Date.now().toString(),
      title: postData.title,
      content: postData.content,
      image: postData.image || '',
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      comments: []
    }
    
    posts.unshift(newPost) // Add to beginning
    localStorage.setItem('posts', JSON.stringify(posts))
    return { success: true, post: newPost }
  },
  
  // Update post
  updatePost(postId, updates) {
    const posts = this.getAllPosts()
    const postIndex = posts.findIndex(p => p.id === postId)
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null')
    
    if (postIndex === -1) {
      return { success: false, message: 'Bài viết không tồn tại' }
    }
    
    if (posts[postIndex].authorId !== currentUser?.id) {
      return { success: false, message: 'Bạn không có quyền chỉnh sửa bài viết này' }
    }
    
    posts[postIndex] = {
      ...posts[postIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    }
    
    localStorage.setItem('posts', JSON.stringify(posts))
    return { success: true, post: posts[postIndex] }
  },
  
  // Delete post
  deletePost(postId) {
    const posts = this.getAllPosts()
    const postIndex = posts.findIndex(p => p.id === postId)
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null')
    
    if (postIndex === -1) {
      return { success: false, message: 'Bài viết không tồn tại' }
    }
    
    if (posts[postIndex].authorId !== currentUser?.id) {
      return { success: false, message: 'Bạn không có quyền xóa bài viết này' }
    }
    
    posts.splice(postIndex, 1)
    localStorage.setItem('posts', JSON.stringify(posts))
    return { success: true }
  },
  
  // Add comment
  addComment(postId, commentText) {
    const posts = this.getAllPosts()
    const postIndex = posts.findIndex(p => p.id === postId)
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null')
    
    if (postIndex === -1) {
      return { success: false, message: 'Bài viết không tồn tại' }
    }
    
    if (!currentUser) {
      return { success: false, message: 'Bạn cần đăng nhập để bình luận' }
    }
    
    const newComment = {
      id: Date.now().toString(),
      text: commentText,
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar || '',
      createdAt: new Date().toISOString()
    }
    
    if (!posts[postIndex].comments) {
      posts[postIndex].comments = []
    }
    
    posts[postIndex].comments.push(newComment)
    localStorage.setItem('posts', JSON.stringify(posts))
    return { success: true, comment: newComment }
  },
  
  // Get user's posts
  getUserPosts(userId) {
    const posts = this.getAllPosts()
    return posts.filter(p => p.authorId === userId)
  }
}
