<template>
    <div class="container">
        <header>
            <!-- 我们希望把页头放这里 -->
            <slot name="header" msg="hello"></slot>
        </header>
        <main>
            <!-- 我们希望把主要内容放这里 -->
            <slot></slot>
        </main>
        <footer>
            <!-- 我们希望把页脚放这里 -->
            <slot name="footer" :msg="'hello'" :age="19"></slot>
        </footer>
    </div>
</template>

<script>
    export default {
        name: "layout"
    }
</script>

<style scoped>

</style>
