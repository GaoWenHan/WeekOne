<script lang="ts" setup>
  import './NotFound.scss'
  import { useRouter } from 'vue-router'

  const router = useRouter()

  const goHome = () => {
    router.push('/') // 或者你的管理系统首页路由
  }

</script>

<template>
  <div class="not-found-container">
    <div class="not-found-content">
      <h1>404</h1>
      <h2>页面未找到</h2>
      <p>非常抱歉，您访问的页面不存在。</p>
      <p>可能是页面地址输入错误或页面已被移除。</p>
      <button @click="goHome" class="home-button">返回首页</button>
    </div>
  </div>
</template>