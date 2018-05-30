<template>
  <div class="bundles">
    <div class="card-group">
      <div class="card item" v-for="bundle of bundles" :key="bundle.id">
        <div class="card-body">
          <h5 class="card-title">
            <b-link :to="`/bundles/${bundle.id}`">{{bundle.name}}</b-link>
          </h5>
          <p class="card-text">
            From: <span class="price price-total">${{bundle.basePrice}}</span>
          </p>
        </div>
        <ul class="list-group list-group-flush">
          
          <div v-if="bundle.bundleProducts.length == 0">
            <h3>Coming soon...</h3>
          </div>

          <li v-else class="list-group-item text-left d-flex justify-content-between align-items-center component" 
            v-for="component of bundle.bundleProducts"
            :key="component.id">
            <b-link :to="`/product/${component.id}`">{{component.name}}</b-link>
            <div class="price price-component">${{component.price}}</div>
          </li>
        </ul>

        <div v-if="!bundle.bundleProducts.length == 0" class="card-body total">
          <h3>Total: <span class="price price-total">${{
            bundle.bundleProducts.reduce((acc, next) => {
              return acc + next.price
            }, 100)
          }}</span></h3>
        </div>

        <div class="card-body">
          <b-button v-if="!bundle.bundleProducts.length == 0" variant="outline-danger" class="card-link add-to-wishlist"><font-awesome-icon icon="heart" /></b-button>
          <b-button v-if="!bundle.bundleProducts.length == 0" class="card-link add-to-cart"><font-awesome-icon icon="cart-plus" /> Cart</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../axios/axios'

export default {
  data () {
    return {
      token: null,
      bundles: [],
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
    axios.get('/bundles', { headers: { 'x-token':this.token }})
      .then(({data}) => {
        this.bundles = data.data
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style lang="scss" scoped>
  .item {
    color: white;
    border: none;
    width: 100%;
    background: transparent;
    border-radius: 5px;
    border: 2px solid #444;
  }

  .price {
    color: orange;
    font-weight: 600;
  }

  .price-total {
    color: red;
  }

  .price-component {
    margin-left: 10px;
  }

  .list-group-item {
    background: none;
    font-size: .9em;
  }

  .list-group-item:nth-child(odd) {
    background: rgba(0,0,0,.2);
    font-size: .9em;
  }

  .add-to-cart {
    background: rgb(255, 145, 0);
    border: orange;
    font-weight: 600;   
  }

  .add-to-wishlist {
    font-weight: 600;    
  }

  .total {
    padding-bottom: 0; 
  }

  .component a{
    color: #ddd;
  }
</style>
