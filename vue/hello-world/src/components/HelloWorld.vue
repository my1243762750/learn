<template>
    <div ref="testDiv" class="hello">
        <el-button @click="cancel">取消</el-button>
        <h1>{{ msg }}</h1>
    </div>
</template>

<script>
    export default {
        name: 'HelloWorld',
        props: {
            msg: String
        },
        beforeCreate() {
            console.log('=====beforeCreate=====')
            console.log(this)
            console.log(this.$el)
            console.log(this.msg)
            console.log(this.getMessage())
        },
        created() {
            console.log('=====created=====')
            console.log(this)
            console.log(this.$el)
            console.log(this.msg)
            console.log(this.getMessage())
        },
        beforeMount() {
            console.log('=====beforeMount=====')
            console.log(this)
            console.log(this.$el)
            console.log(this.msg)
            console.log(this.getMessage())
        },
        mounted() {
            console.log('=====mounted=====')
            console.log(this)
            console.log(this.$el)
            console.log(this.msg)
            console.log(this.getMessage())
        },
        methods: {
            getMessage() {
              console.log('获取信息')
            },
            cancel() {
                this.$confirm('是否确认关闭当前提货单?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '确定!'
                    })
                }).catch(() => {
                    this.$message({
                        type: 'warning',
                        message: '取消!'
                    })
                })
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
