import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import ProductList from '@/components/ProductList'
import ProductDetail from '@/components/ProductDetail'
import Bundles from '@/components/Bundles'
import BundleDetail from '@/components/BundleDetail'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '',
      component: Home,
      children: [
        {
          path: '',
          name: 'ProductList',
          component: ProductList
        },
        {
          path: '/product/:id',
          name: 'ProduceDetail',
          component: ProductDetail
        },
        {
          path: '/bundles/',
          name: 'Bundles',
          component: Bundles
        },
        {
          path: '/bundles/:id',
          name: 'BundlesDetail',
          component: BundleDetail
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
