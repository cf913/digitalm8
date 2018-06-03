<template>
  <div class="product-detail" v-if="component">
    <b-breadcrumb class="bread" :items="items"/>
    <div class="row container">
      <div class="col-md-5">
        <img :src="component.image" alt="Product Image">
      </div>
      <div class="col-md-7 description">
        <h2 class="title">{{component.name}}</h2>
        <h3 class="price">${{component.price}}</h3>

        <p>{{component.description}}</p>
          <b-button variant="outline-danger" size="lg" class="card-link add-to-wishlist"><font-awesome-icon icon="heart" /></b-button>
          <b-button class="card-link add-to-cart" size="lg"><font-awesome-icon icon="cart-plus" /> Cart</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../axios/axios'

export default {
  data () {
    return {
      component: null,
      items: [{
        text: 'All Products',
        to: '/'
      },
      {
        text: null,
        to: null
      },
      {
        text: null,
        to: null
      },
      {
        text: null,
        active: true
      }]
    }
  },
  computed: {
    token () {
      return this.$store.getters.token
    }
  },
  created () {
    axios.get(`/products/${this.$route.params.id}`, { headers: { 'x-token': this.token }})
      .then(({data}) => {
        this.component = data.data
        const category = this.component.category.name
        this.items[1] = {
          text: category.toUpperCase(), // capitalize category name
          to: `/?category=${category}`
        }
        this.items[2] = {
          text: this.component.name.slice(0, this.component.name.indexOf(' ')),
          to: `/?brand=${this.component.name.slice(0, this.component.name.indexOf(' '))}`
        }
        this.items[3].text = this.component.name.slice(0, 30) + '...'
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

  img {
    width: 100%;
  }

  .bread {
    background: none;
   
    a {
      color: #ddd;
    }

    span {
      color: orange;
    }
  }

  .add-to-cart {
    background: rgb(255, 145, 0);
    border: orange;
    font-weight: 600;   
  }
</style>
