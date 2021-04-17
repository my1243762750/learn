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
        methods: {
            input(e) {
                console.log('val', e.target.value);
                this.$emit('update:val', +e.target.value);
            }
        }
    }
</script>

<style scoped>

</style>
