<template>
  <div class="main">
    <b-navbar toggleable="md" type="dark" class="py-3">
      <div class="container-fluid">
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand to="/" class="raleway">
        Digital<span class="orange">m8</span>
      </b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">

        <b-navbar-nav>
          <b-nav-item to="/" exact>All Products</b-nav-item>
          <b-nav-item to="/bundles">Bundles</b-nav-item>
        </b-navbar-nav>

      <!-- <b-navbar-nav  class="search-bar-container m-auto">
          <b-nav-form>
            <b-form-input size="sm" class="search-bar" type="text" placeholder="Search"/>
          </b-nav-form>
        </b-navbar-nav> -->

        <b-navbar-nav class="ml-auto right">
            <b-nav-item href="#">
              <font-awesome-icon icon="heart" size="lg"/>
            </b-nav-item>
            <b-nav-item href="#" disabled>
              <font-awesome-icon icon="shopping-cart" size="lg"/>
            </b-nav-item>
            <b-nav-item v-if="loggedIn" @click="logout()">Sign Out</b-nav-item>
            <b-nav-item v-else to="/login">Login</b-nav-item>
        </b-navbar-nav>

      </b-collapse>
      </div>
    </b-navbar>
  </div>
</template>

<script>

export default {
  computed: {
    loggedIn () {
      return this.$store.getters.token
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('logout') 
    }
  }
}
</script>

<style lang="scss" scoped>
  .raleway {
    font-size: 1.5em;
  }
  .navbar {
    background: rgb(43, 43, 43);
    border-bottom: 4px solid orange;
    font-weight: bold;
  }

  .search-bar {
    width: 400px;
  }

  .right li {
    margin-left: 20px;
  }
</style>


