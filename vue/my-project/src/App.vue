<template>
  <div id="app">
    <!--指令-->
    <button :key="key" v-debounce="add">click me!</button>
<!--    <button v-debounce="add('item1')">click me!</button>-->
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      key: 0
    }
  },
  methods: {
    add(params) {
      this.key++
      console.log('add', params)
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
