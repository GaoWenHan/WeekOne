import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '@/views/login/index.vue'
import Layout from '@/layouts/index.vue'
import NotFound from '@/views/notFound/index.vue'
import Home from '@/views/home/index.vue'


const routes = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path:'/layout',
      name: 'layout',
      component: Layout,
      children:[
        {
          path: 'home',
          name: 'home',
          component: Home
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound
    }
  ]
})


export default routes