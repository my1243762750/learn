<template>
    <div>
        <label v-if="label">{{label}}</label>
        <slot></slot>
        <div v-if="error">{{error}}</div>
    </div>
</template>

<script>
    import Validator from 'async-validator';
    export default {
        name: "MyFormItem",
        provide(){
          return {
            formItemInstance: this
          }
        },
        inject: ['formInstance'],
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
                error: ''
            }
        },
        mounted() {
            this.formInstance.setFormItemInstance(this);
        },
        methods: {
           validate() {
              const rules = this.formInstance.rules[this.prop];
              const value = this.formInstance.form[this.prop];
              const validator = new Validator({[this.prop]: rules});
              return validator.validate({[this.prop]: value}, (errors) => {
                  if (errors) {
                    this.error = errors[0]?.message;
                  } else {
                    this.error = '';
                  }
                  console.log('errors', errors);
              })
            }
        }
    }
</script>

<style scoped>
</style>
