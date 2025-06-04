export const componentMap: Record<string, () => Promise<any>> = {
  'revenue': () => import('@/views/revenue/index.vue'),
}