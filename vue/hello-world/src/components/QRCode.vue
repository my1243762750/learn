<template>
    <canvas id="canvas"></canvas>
</template>
<script>
    import QRCode from 'qrcode'
    export default{
        components: {
            QRCode: QRCode
        },
        methods: {
            useqrcode(){
                var canvas = document.getElementById('canvas')
                QRCode.toCanvas(canvas, 'https://blog.csdn.net/weixin_42890953/article/details/82776760', function (error) {
                    if (error) console.error(error)
                    console.log('QRCode success!');
                })
            }
        },
        mounted(){
            this.useqrcode();
        }
    }
</script>
<style></style>