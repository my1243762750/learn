<template>
  <div id="app">
    <p v-html="test"></p>   <!-- 点击后有弹框 -->
    <p v-html="sanitizeHTML(test)"></p>   <!-- 点击后有弹框 -->
    <p v-html="$xss(test)"></p> <!-- click事件被过滤，点击无效果 -->
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      test: `<a onclick='alert("xss攻击")'>链接</a>`
    }
  },
  methods: {
    sanitizeHTML(str) {
      let temp = document.createElement("div");
      temp.textContent = str;
      // console.log(temp.innerHTML)
      return temp.innerHTML;
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
