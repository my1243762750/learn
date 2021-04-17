<template>
    <div>
        <input type="text" :value="val" @input="input">
    </div>
</template>

<script>
    export default {
        props: {
          val: {
              type: Number,
              default: 0
          }
        },
        name: "MyInput",
        mounted() {
            console.log('val', this.val);
        },
        methods: {
            input(e) {
                console.log('val', e.target.value);
                this.$emit('input', +e.target.value);
            }
        }
    }
</script>

<style scoped>

</style>
