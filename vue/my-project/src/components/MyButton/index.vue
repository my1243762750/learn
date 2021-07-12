<template>
    <div>
        <button @click="submit">
            <slot></slot>
        </button>
    </div>
</template>

<script>
    export default {
        name: "MyButton",
        methods: {
            submit() {
                this.$emit('click');
            }
        }
    }
</script>

<style scoped>

</style>
