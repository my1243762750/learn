<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "MyForm",
        provide() {
            return {
                form: this
            }
        },
        props: {
            form: {
                required: true,
                type: Object,
                default() {
                    return {}
                }
            },
            rules: {
                type: Object,
                default() {
                    return {};
                }
            }
        },
        data() {
          return {
              formItemInstances: []
          }
        },
        methods: {
            validate(fn) {
                console.log('validate', this.form);
                console.log('validate', this.rules);
                console.log('validate', this.formItemInstances);
                const list = this.formItemInstances.map((instance) => {
                    return instance.validate();
                });
                Promise.all(list).then(() => {
                    fn && fn(true);
                }, () => {
                    fn && fn(false);
                }).catch(() => {
                    fn && fn(false);
                });

            },
            setFormItemInstance(instance) {
                this.formItemInstances.push(instance);
            }
        }
    }
</script>

<style scoped>

</style>
