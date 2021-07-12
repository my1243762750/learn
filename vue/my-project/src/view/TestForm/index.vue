<template>
    <div>
        <MyForm ref="form" :form="model" :rules="rules">
            <MyTest>
                <MyFormItem label="用户名" prop="username">
                    <MyInput type="text" v-model="model.username" />
                </MyFormItem>
                <MyFormItem label="密码" prop="password">
                    <MyInput type="password" v-model="model.password" />
                </MyFormItem>
            </MyTest>
            <MyButton @click="submit">提交</MyButton>
        </MyForm>
    </div>
</template>

<script>
    import MyForm from "../../components/MyForm/index";
    import MyFormItem from "../../components/MyForm/FormItem";
    import MyInput from "../../components/MyInput/index";
    import MyButton from "../../components/MyButton/index";
    import MyTest from "../../components/MyTest/index";
    export default {
        name: "index",
        components: {
            MyForm,
            MyFormItem,
            MyInput,
            MyButton,
            MyTest
        },
        data() {
            return {
                model: {
                    username: 'zhangsan',
                    password: '123456'
                },
                rules: {
                    username: [{required: true, message: '用户名不能为空'}],
                    password: [{required: true, message: '密码不能为空'}]
                }
            }
        },
        methods: {
            submit() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        console.log('success');
                    } else {
                        console.log('failed');
                    }
                })
                console.log('submit');
            }
        }
    }
</script>

<style scoped>

</style>
