<template>
    <div id="app">
        <TestForm />
    </div>
</template>

<script>
    import TestForm from './view/TestForm/index'
    export default {
        name: 'App',
        components: {
            TestForm
        },
        data() {
            return {
                val: 10
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
