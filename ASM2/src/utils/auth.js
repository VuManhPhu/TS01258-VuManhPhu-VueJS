// Authentication utility functions
export const authService = {
  // Register new user
  register(userData) {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const existingUser = users.find(u => u.email === userData.email)
    
    if (existingUser) {
      return { success: false, message: 'Email đã được sử dụng' }
    }
    
    const newUser = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      password: userData.password, // In production, hash this!
      avatar: userData.avatar || '',
      createdAt: new Date().toISOString()
    }
    
    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))
    return { success: true, user: newUser }
  },
  
  // Login user
  login(email, password) {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const user = users.find(u => u.email === email && u.password === password)
    
    if (user) {
      const { password, ...userWithoutPassword } = user
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword))
      return { success: true, user: userWithoutPassword }
    }
    
    return { success: false, message: 'Email hoặc mật khẩu không đúng' }
  },
  
  // Logout user
  logout() {
    localStorage.removeItem('currentUser')
  },
  
  // Get current user
  getCurrentUser() {
    const userStr = localStorage.getItem('currentUser')
    return userStr ? JSON.parse(userStr) : null
  },
  
  // Update user profile
  updateProfile(userId, updates) {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const userIndex = users.findIndex(u => u.id === userId)
    
    if (userIndex === -1) {
      return { success: false, message: 'Người dùng không tồn tại' }
    }
    
    users[userIndex] = { ...users[userIndex], ...updates }
    localStorage.setItem('users', JSON.stringify(users))
    
    // Update current user if it's the same user
    const currentUser = this.getCurrentUser()
    if (currentUser && currentUser.id === userId) {
      const { password, ...userWithoutPassword } = users[userIndex]
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword))
    }
    
    return { success: true, user: users[userIndex] }
  }
}
