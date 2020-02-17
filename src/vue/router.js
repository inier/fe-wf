import Vue from 'vue'
import Router from 'vue-router'
import HelloVue from './HelloVue.vue'
import fine2 from './ButtonCounter.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloVue
    },
    {
      path: '/component',
      name: 'fine3',
      component: fine2
    }
  ]
})
