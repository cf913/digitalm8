<template>
  <div class="home">
    <app-header :loggedIn="token"></app-header>
    <div class="container">
      <div class="row my-3">
        <div class="col-sm-2 left">
          <b-list-group class="category-list">
             <b-list-group-item class="description" deactivated>Components</b-list-group-item>
            <b-list-group-item v-for="(category, i) of categories" :key="i" @click="filterCategories(category.name)">
              <p>{{category.name}}</p>
            </b-list-group-item>
          </b-list-group>
          <br>
          <b-list-group class="brand-list">
             <b-list-group-item class="description" deactivated>Brands</b-list-group-item>
            <b-list-group-item v-for="(brand, i) of brands" :key="i" @click="filterBrands(brand)">
              <p>{{brand}}</p>
            </b-list-group-item>
          </b-list-group>

        </div>
        <div class="col-sm-10">
          <transition name="component-fade-fast" mode="out-in">
            <router-view></router-view>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from './Header.vue'
import axios from '../axios/axios'

export default {
  components: {
    appHeader: Header
  },
  data () {
    return {
      token: null
    }
  },
  computed: {
    categories () {
      return this.$store.getters.categories
    },
    brands () {
      return this.$store.getters.brands
    }
  },
  methods: {
    filterCategories (category) {
      this.$router.push('/?category=' + category)
    },
    filterBrands (brand) {
      this.$router.push('/?brand=' + brand)
    }
  },
  created () {
    this.$store.dispatch('tryAutoLogin')
    this.$store.dispatch('getCategories')
    this.$store.dispatch('getBrands')
  }
}
</script>

<style lang="scss" scoped>

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.category-list, .brand-list {
  border: 2px solid orange;
  border-radius: 5px;
}

.category-list p {
  margin: 0;
  text-transform: uppercase;
  color: #ddd;
}

.left {
  padding: 0;
}

.list-group-item {
  background-color: rgba(0,0,0,.2);
  cursor: pointer;
  font-weight: bold;
}

.list-group-item:hover {
  background: orange;
  
  p {
    color: #000;
  }
}

.list-group-item:active {
  background: rgba(255, 166, 0, 0.433);
}

.description{
  background-color: #444 !important;
  border-bottom: 2px solid #555;
  cursor: auto;
}
</style>
