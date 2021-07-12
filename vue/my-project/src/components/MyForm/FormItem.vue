<template>
    <div>
        <label v-if="label">{{label}}</label>

        <slot></slot>

        <div v-if="err">{{err}}</div>
    </div>
</template>

<script>
    import Validator from 'async-validator';
    export default {
        name: "MyFormItem",
        inject: ['form'],
        props: {
            label: {
                type: String,
                default: ''
            },
            prop: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                err: ''
            }
        },
        mounted() {
            this.form.setFormItemInstance(this);
        },
        methods: {
            validate() {
                const rules = this.form.rules[this.prop];
                const value = this.form.model[this.prop];
                const validator = new Validator({[this.prop]: rules});
                return validator.validate(value, (errors) => {
                    console.log('errors', errors);
                })
            }
        }
    }
</script>

<style scoped>

</style>
