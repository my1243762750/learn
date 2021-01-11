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
    import HelloWorld from './components/HelloWorld.vue'
    import QRCode from './components/QRCode.vue'
    import VMap from './components/VMap/index1.vue'
    import saveMap from './components/AMap/saveAMap.vue'
    import saveImage from './components/saveImage.vue'
    import website from './components/website.vue'

    export default {
        name: 'app',
        components: {
            HelloWorld,
            QRCode,
            VMap,
            saveMap,
            saveImage,
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
