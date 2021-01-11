<template>
    <div>
        <span class="title">amap</span>
        <div id="map" class="map" style="width: 500px;height: 300px;border: solid 1px #ccc;margin: auto;"></div>
        <span @click="saveMap()">保存</span>
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
            // 初始化地图
            initMap() {
                var map = new AMap.Map('map', {
                    center:[117.000923,36.675807],
                    zoom:11
                });
            },
            // 下载地图
            downloadCanvasImage(selector, name) {
                // 通过选择器获取canvas元素
                var canvas = document.querySelector(selector)
                // 使用toDataURL方法将图像转换被base64编码的URL字符串
                var url = canvas.toDataURL('image/png')
                // 生成一个a元素
                var a = document.createElement('a')
                // 创建一个单击事件
                var event = new MouseEvent('click')

                // 将a的download属性设置为我们想要下载的图片名称，若name不存在则使用‘下载图片名称’作为默认名称
                a.download = name || '下载图片名称'
                // 将生成的URL设置为a.href属性
                a.href = url

                // 触发a的单击事件
                a.dispatchEvent(event)
            },
            // 保存地图
            saveMap() {
                this.downloadCanvasImage('#map .amap-layer')
            }
        }
    }
</script>

<style scoped>

</style>