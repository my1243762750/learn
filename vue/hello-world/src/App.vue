<template>
    <div id="app">
        <website></website>
        <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->
        <!--<q-r-code></q-r-code>-->
        <!--<v-map></v-map>-->
        <!--<save-map></save-map>-->
        <!--<save-image></save-image>-->
    </div>
</template>

<script>
    import website from './components/website.vue'

    export default {
        name: 'app',
        components: {
            website
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
    }
</style>
