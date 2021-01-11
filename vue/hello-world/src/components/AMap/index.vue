<template>
    <div>
        <span class="title">amap</span>
        <div id="map" class="map" style="width: 500px;height: 300px;border: solid 1px #ccc;margin: auto;"></div>
    </div>
</template>

<script>
    // import AMap from 'amap'
    export default {
        name: "index",
        data() {
            return {
                map: {}
            }
        },
        mounted() {
          this.initMap()
        },
        methods: {
            initMap() {
                var map = new AMap.Map('map', {
                    center:[117.000923,36.675807],
                    zoom:11
                });
            }
        }
    }
</script>

<style scoped>

</style>