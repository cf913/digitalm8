<template>
  <div class="card-group">
    <app-product-item 
      v-for="component of components" 
      :key="component.id" 
      :component="component">
    </app-product-item>
  </div>
</template>

<script>
import axios from '../axios/axios'
import ProductItem from './ProductItem.vue'
export default {
  components: {
    appProductItem: ProductItem
  },
  data () {
    return {
      token: null,
      components: [],
    }
  },
  watch: {
    '$route.query'() {
      this.fetch()
    }
  },
  methods: {
    fetch () {
      axios.get('/products', { headers: { 'x-token':this.token }})
      .then(({data}) => {
        if (this.$route.query.category) this.components = data.data.filter(elem => (elem.category.name === this.$route.query.category))
        else this.components = data.data
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
  created () {
    // Keep token in a Vuex store to save a localStorage read
    const authToken = JSON.parse(localStorage.getItem('AuthToken'))
    if (authToken) {
      this.token = authToken
    } else {
      this.$router.push('/login')
      return
    }
    this.fetch()
  }
}
</script>

<style lang="scss" scoped>

</style>

 