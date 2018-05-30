<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <transition name="component-fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Raleway:200,400');

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ddd;
  height: 100%;
  min-height: 100vh;
  background: #222;
}

.orange {
  color: orange;
}

.component-fade-fast-enter-active, .component-fade-fast-leave-active {
  transition: opacity .15s ease-in-out;
}
.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .5s ease;
}
.component-fade-enter, .component-fade-leave-to, .component-fade-fast-enter, .component-fade-fast-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.raleway {
  font-family: 'Raleway', sans-serif;
}
</style>
