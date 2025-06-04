<script lang="ts" setup>
  import './header.scss'
  import { ref } from 'vue'

  const userName = ref('Admin') // 示例用户名
  const userAvatar = ref('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjT295-ekit0wFFak54ypSqgzls6rnBWxhrQ&s') // 示例头像链接


</script>

<template>
  <header class="HeaderContainer">
    <div class="header-left">
      <div class="logo"></div>
      <span class="system-title">管理系统</span>
    </div>
    <div class="header-right">
      <img :src="userAvatar" alt="User Avatar" class="user-avatar">
      <span class="user-name">{{ userName }}</span>
    </div>
  </header>
</template>