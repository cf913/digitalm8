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
      components: [],
    }
  },
  computed: {
    token () {
      return this.$store.getters.token
    }
  },
  watch: {
    '$route.query'() {
      this.fetch()
    }
  },
  methods: {
    fetch () {
      axios.get('/products', { headers: { 'x-token': this.token }})
      .then(({data}) => {

        // Filter by categories
        if (this.$route.query.category) this.components = data.data.filter(elem => (elem.category.name === this.$route.query.category))
        // Filter by brands
        else if (this.$route.query.brand) {
          this.components = data.data.filter(elem => {
            if (this.$route.query.brand === 'Cooler Master') {
              return elem.name.slice(0, elem.name.indexOf(' ')) === 'Cooler'
            }
            return elem.name.slice(0, elem.name.indexOf(' ')) === this.$route.query.brand
          })
        }
        else this.components = data.data
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
  created () {
    this.fetch()
  }
}
</script>

<style lang="scss" scoped>

</style>

 