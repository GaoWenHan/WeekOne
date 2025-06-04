<script lang="ts" setup>
  import { ref, reactive } from 'vue'
  import { useRouter } from 'vue-router'
  import { debounce } from '../../utils/throttleDebounce'
  import './login.scss'

  const router = useRouter()
  const loginForm = reactive({
    username: '',
    password: ''
  })

  const loading = ref(false)

  const handleLogin = debounce(async () => {
    loading.value = true
    try {
      // 这里添加登录逻辑
      await new Promise(resolve => setTimeout(resolve, 1000))
      router.push('/layout/home')
      console.log('登录信息：', loginForm)
    } finally {
      loading.value = false
    }
  },500)
</script>

<template>
  <div class="login-container">
    <div class="login-left">
      <h1>餐厅管理系统</h1>
      <p>内部人员登录入口</p>
    </div>
    <div class="login-box">
      <div class="login-header">
        <h2>后台登录</h2>
        <p>请输入您的账号和密码</p>
      </div>
      
      <div class="login-form">
        <div class="form-item" :class="{ 'is-active': loginForm.username }">
          <input 
            type="text" 
            v-model="loginForm.username"
            placeholder="用户名"
          >
          <i class="icon-user"></i>
        </div>
        
        <div class="form-item" :class="{ 'is-active': loginForm.password }">
          <input 
            type="password" 
            v-model="loginForm.password"
            placeholder="密码"
          >
          <i class="icon-lock"></i>
        </div>

        <div class="form-options">
          <label class="remember-me">
            <input type="checkbox">
            <span>记住我</span>
          </label>
          <a href="#" class="forgot-password">忘记密码？</a>
        </div>

        <button 
          class="login-button" 
          :class="{ 'is-loading': loading }"
          @click="handleLogin"
        >
          <span v-if="!loading">登录</span>
          <span v-else class="loading-spinner"></span>
        </button>
      </div>
    </div>
  </div>
</template>
