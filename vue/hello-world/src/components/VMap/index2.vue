<template>
    <div id="app">
        <h3 class="title">{{ msg }}</h3>
        <div class="amap-wrapper">
            <el-amap class="amap-box" :vid="'amap-vue'"></el-amap>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'VMap',
        data() {
            return {
                msg: 'vue-amap向你问好！'
            }
        }
    }
</script>

<style>
    .amap-wrapper {
        margin: auto;
        width: 500px;
        height: 500px;
    }
</style>