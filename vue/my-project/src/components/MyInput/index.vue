<template>
    <div>
        <input :type="type" :value="value" v-bind="$attrs" @input="onInput">
    </div>
</template>

<script>
    export default {
        name: "MyInput",
        inject: ['formItemInstance'],
        props: {
            type: {
                type: String,
                value: 'text'
            },
            value: {
                type: String,
                value: ''
            }
        },
        methods: {
            onInput(e) {
                this.$emit('input', e.target.value);

                if (this.formItemInstance) {
                  this.formItemInstance.validate();
                }
            }
        }
    }
</script>

<style scoped>

</style>
