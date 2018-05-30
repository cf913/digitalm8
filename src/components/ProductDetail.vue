<template>
  <div class="product-detail" v-if="component">
    <div class="row">
      <div class="col-sm-5">
        <img :src="component.image" alt="Product Image">
      </div>
      <div class="col-sm-7 description">
        <h2 class="title">{{component.name}}</h2>
        <h3 class="price">${{component.price}}</h3>

        <p>{{component.description}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../axios/axios'

export default {
  data () {
    return {
      component: null
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
    axios.get(`/products/${this.$route.params.id}`, { headers: { 'x-token':this.token }})
      .then(({data}) => {
        this.component = data.data
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style lang="scss" scoped>
  .description {
    text-align: left;
    
    h2 {
      padding-bottom: 20px;
      margin-bottom: 20px;
      border-bottom: 2px solid #ddd;
    }

    .price {
      color: red;
    }
  }
</style>
