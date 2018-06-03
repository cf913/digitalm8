<template>
  <div>
    <b-button @click="$router.go(-1)" size="sm" variant="outline-secondary" class="float-left"><font-awesome-icon icon="arrow-left" /> Back</b-button>
    <div class="wishlist">
      <h2>My Wishlist</h2>
     
      <div class="title">
        <p>Components</p>
      </div> 

      <div class="card-group components">
        <app-product-item 
          v-for="component of wishlist.components" 
          :key="component.id" 
          :component="component">
        </app-product-item>
      </div>
      
      <div class="title">
        <p>Bundles</p>
      </div>

      <div class="card-group bundles">
        <b-card-group deck
                  class="mb-3">
            <b-card 
                v-for="bundle of wishlist.bundles" 
                :key="bundle.id"
                bg-variant="primary"
                text-variant="white"
                header="bundle.name"
                class="text-center">
            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </b-card>
        </b-card-group>
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
  }
}
</script>

<style lang="scss" scoped>

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
</style>
