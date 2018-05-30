<template>
  <div class="home">
    <app-header :loggedIn="token"></app-header>
    <div class="container">
      <div class="row my-3">
        <div class="col-sm-2 left">
          <b-list-group class="category-list">
            <b-list-group-item v-for="(category, i) of categories" :key="i" @click="filterCategories(category.name)">
              <p>{{category.name}}</p>
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
      token: null,
      categories: []
    }
  },
  methods: {
    filterCategories (category) {
      this.$router.push('/?category=' + category)
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
    axios.get('/categories', { headers: { 'x-token':this.token }})
      .then(({data}) => {
        this.categories = data.data
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style lang="scss" scoped>
ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.category-list {
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

.list-group-item:hover p {
  color: orange;
}
</style>
