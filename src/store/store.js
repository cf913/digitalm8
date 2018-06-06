import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'

import axios from '../axios/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    cart: [],
    wishlist: {
      components: [],
      bundles: []
    },
    categories: [],
    brands: []
  },
  mutations: {
    saveToken (state, token) {
      state.token = token
    },
    setCategories (state, categories) {
      state.categories = categories
    },
    setBrands (state, brands) {
      state.brands = brands
    },
    setWishlist (state, wishlist) {
      state.wishlist = wishlist
    }

  },
  actions: {
    ////////// AUTH
    login ({commit}, form) {
      axios.post('/user/login', form)
        .then(json => {
          commit('saveToken', json.data.data.token) 
          localStorage.setItem('AuthToken', JSON.stringify(json.data.data.token))
          router.push('/')
        })
        .catch(err => {
          console.log(err)
        })
    },
    tryAutoLogin ({commit, dispatch}) {
      const token = JSON.parse(localStorage.getItem('AuthToken'))
      if (!token) {
        router.push('/login')
      } else {
        commit('saveToken', token) 
      }
    },
    logout ({commit}) {
      commit('saveToken', null)
      localStorage.removeItem('AuthToken')
      router.push('/login')
    },// END AUTH

    ////////// CATEGORIES
    getCategories({state, commit}) {
      axios.get('/categories', { headers: { 'x-token': state.token }})
      .then(({data}) => {
        commit('setCategories', data.data)
      })
      .catch(err => {
        console.log(err)
      })
    },
    ////////// BRANDS
    getBrands({state, commit}) {
      axios.get('/products', { headers: { 'x-token': state.token }})
        .then(({data}) => {
          let brandList = []
          // Get brand from product.name
          data.data.map(elem => {
            let brand = elem.name.slice(0, elem.name.indexOf(' '))
            // Cooler Master is currently the only two words brand
            if (brand === 'Cooler') brand = 'Cooler Master'
            if (!brandList.includes(brand)) brandList.push(brand)
          })

          brandList.sort()
          commit('setBrands', brandList)
        })
        .catch(err => {
          console.log(err)
        })
    },
    ////////// WISHLIST 
    addToWishlist({state, commit}, product) {
      const wishlist = state.wishlist
      console.log(wishlist)
      if (wishlist.components.filter(e => e.id === product.id).length > 0 
            || wishlist.bundles.filter(e => e.id === product.id).lenght > 0) return
      if (product.basePrice) {
        wishlist.bundles.push(product)
      }
      else wishlist.components.push(product)
        commit('setWishlist', wishlist)
    },
    removeItemWishlist({state, commit}, id) {
      const updated_wishlist = {
        components: state.wishlist.components.filter(elem => id !== elem.id),
        bundles: state.wishlist.bundles
      }
      commit('setWishlist', updated_wishlist)
    }
  },
  getters: {
    token (state) {
      return state.token
    },
    categories (state) {
      return state.categories
    },
    brands (state) {
      return state.brands
    },
    wishlist (state) {
      return state.wishlist
    }
  },
  modules: {
  }
})