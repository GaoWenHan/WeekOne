<script lang="ts" setup>
  import Menus from '@/components/menus/index.vue'
  import Header from '@/components/header/index.vue'
  import { RouterView } from 'vue-router'

</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-container>
        <el-aside width="200px">
          <Menus />
        </el-aside>
        <el-main>
          <RouterView />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


<style lang="scss" scoped>
.common-layout {
  width: 100vw;
  height: 100vh;
  display: flex;
  overflow: hidden;

  .el-header {
    height: 60px;
    background-color: var(--el-color-primary);
    color: white;
    display: flex;
    align-items: center;
    padding: 0;
  }

  .el-aside {
    height: calc(100vh - 60px);
    background-color: var(--el-color-info-light-9);
    border-right: 1px solid var(--el-border-color-light);
    overflow-y: auto;
  }

  .el-main {
    padding: 20px;
    background-color: var(--el-bg-color);
  }
}
</style>
