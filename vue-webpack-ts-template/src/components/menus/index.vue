<script lang="ts" setup>
  import {
  List,
  Location,
  Setting,
  Document,
  Menu as IconMenu,
} from '@element-plus/icons-vue'
import { computed } from 'vue'
const iconMap: Record<'List' | 'Location' | 'Setting' | 'Document' | 'IconMenu', any> = {
  List,
  Location,
  Setting,
  Document,
  IconMenu,
}
type IconKey = 'List' | 'Location' | 'Setting' | 'Document' | 'IconMenu'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()

const menuRoutes = computed(() => userStore.routes.filter(r => r.showInMenu))
  const handleOpen = (key: string, keyPath: string[]) => {
  console.log('open', key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log('close', key, keyPath)
}
</script>

<template>
  <el-menu
    default-active="someActiveIndex"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
  >
    <el-menu-item
      v-for="item in menuRoutes"
      :key="item.path"
      :index="item.path"
    >
      <el-icon v-if="item.icon && iconMap[item.icon as IconKey]">
  <component :is="iconMap[item.icon as IconKey]" />
</el-icon>

      <span>{{ item.name }}</span>
    </el-menu-item>
  </el-menu>
</template>
