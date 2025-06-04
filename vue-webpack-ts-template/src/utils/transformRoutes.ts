import type { RouteRecordRaw } from 'vue-router'

export function transformRoutes(routesFromBackend: any[]): RouteRecordRaw[] {
  return routesFromBackend.map(route => {
    return {
      path: route.path,
      name: route.name,
      meta: {
        icon: route.icon,
        showInMenu: route.showInMenu
      },
      component: () => import(`@/views/${route.component}/index.vue`) // 注意路径规则
    }
  })
}
