<template>
  <div>
    <b-button @click="$router.go(-1)" size="sm" variant="outline-secondary" class="float-left"><font-awesome-icon icon="arrow-left" /> Back</b-button>
    <div class="wishlist">
      <h2>My Wishlist</h2>
     
      <div class="title">
        <p>Components: <strong>{{wishlist.components.length}}</strong></p>
      </div> 

      <div class="card-group components" v-if="wishlist.components.length > 0">
        <app-product-item 
          v-for="component of wishlist.components" 
          :key="component.id" 
          :component="component" :wishlist="true">
        </app-product-item>
      </div>
      
      <div class="title">
        <p>Bundles: <strong>{{wishlist.bundles.length}}</strong></p>
      </div>

      <div class="card-group bundles" v-if="wishlist.bundles.length > 0">
        <div class="card item" v-for="bundle of wishlist.bundles" :key="bundle.id">
          <div class="card-body">
            <h5 class="card-title">
              <b-link :to="`/bundles/${bundle.id}`">{{bundle.name}}</b-link>
            </h5>
          </div>
          <div class="card-text">
            <p class="rm_wishlist" @click="removeItemHandler(bundle.id)">Remove item</p>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import ProductItem from './ProductItem.vue'

export default {
  components: {
    appProductItem: ProductItem
  },
  computed: {
    wishlist () {
      return this.$store.getters.wishlist
    }
  },
  methods: {
    removeItemHandler(id) {
      this.$store.dispatch('removeItemWishlist', {type: 'bundles', id})
    } 
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

  .wishlist {
    clear: both;
    margin-top: 20px;
  }
  .components {
    padding: 10px 0;
    border-radius: 5px;
    border: 2px solid orange;
  }

  .title {
    margin: 10px 0 0 0;
    padding: 5px 10px;

    p {
      font-size: 1.5em;
      margin: 0;
      text-align: left;
      color: orange;
    }
  }

  a {
    color: #ddd;
  }

  .rm_wishlist {
    margin: 0;
    color: #555;
    text-decoration: underline;
  }

  .rm_wishlist:hover {
    color: #ddd;
    cursor: pointer;
  }
</style>
