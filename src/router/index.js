import Vue from 'vue'
import Router from 'vue-router'
import demo from '../views/demo.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'demo',
      component: demo
    }
  ]
})

export default router
