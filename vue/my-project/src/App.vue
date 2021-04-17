<template>
    <div id="app">
        {{ val }}
        <my-input :val.sync="val"></my-input>
        <my-input-model v-model="val"></my-input-model>

    </div>
</template>

<script>
    import MyInput from "./components/MyInput";
    import MyInputModel from "./components/MyInput_model";

    export default {
        name: 'App',
        components: {
            MyInput,
            MyInputModel
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
