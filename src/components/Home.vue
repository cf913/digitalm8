<template>
  <div class="home">
    <app-header :loggedIn="token"></app-header>
    <div class="container-fluid">
      <div class="row my-3">
        <div class="col-sm-4 col-md-3 col-lg-2">
          <b-list-group class="category-list">
             <b-list-group-item class="description" deactivated>Components</b-list-group-item>
            <b-list-group-item :class="{selected: $route.query.category == category.name}" v-for="(category, i) of categories" :key="i" @click="filterCategories(category.name)">
              <p>{{category.name}}</p>
            </b-list-group-item>
          </b-list-group>
          <b-list-group class="brand-list">
             <b-list-group-item class="description" deactivated>Brands</b-list-group-item>
            <b-list-group-item :class="{selected: $route.query.brand == brand}" v-for="(brand, i) of brands" :key="i" @click="filterBrands(brand)">
              <p>{{brand}}</p>
            </b-list-group-item>
          </b-list-group>

        </div>
        <div class="col-sm-8 col-md-9 col-lg-10">
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
.container-fluid {
  max-width: 1200px;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.category-list, .brand-list {
  // border: 2px solid orange;
  border-radius: 5px;
  text-align: left;

  p {
    margin: 0 0 0 -5px;
    color: #aaa;
  }
}

.category-list {
  margin-bottom: 20px;
  p {
    text-transform: uppercase;
  }
}

.left {
  padding: 0;
}

.list-group-item {
  background-color: rgba(0,0,0,.2);
  cursor: pointer;
  font-weight: bold;
  border-left: 5px solid transparent;
  transition: .2s;
}

.list-group-item:hover {
  border-left: 5px solid orange;  
  
  p {
    color: #fff;
  }
}

.list-group-item:first-child:hover {
  border-left-color: transparent;
}

.list-group-item:active {
  background: #555;
}

.selected {
  border-left: 5px solid orange;  
  
  p {
    color: orange;
  }
}

.description{
  background-color: #444 !important;
  border-left: none;
  border-bottom: 2px solid orange;
  color: orange;
  cursor: auto;
}

.description:hover {
  border-left: none;
}
</style>
