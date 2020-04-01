<template>
  <div id="app">
    <clip/>
  </div>
</template>

<script>
import clip from './components/clip/index.vue'

export default {
  name: 'App',
  components: {
    clip
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 12px;
}
html, body{
  padding: 0;
  margin: 0;
}
</style>
