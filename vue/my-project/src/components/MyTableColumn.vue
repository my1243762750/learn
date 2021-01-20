<template>
    <div>
        <div class="inline-block">{{ label }}</div>
        <div class="inline-block" v-if="sortable">
            <span class="arrow-down pointer" :class="{'arrow-active': row.activeArrow === 'down'}" @click="activeToggle(row, 'down')">&#8595;</span>
            <span class="arrow-up pointer" :class="{'arrow-active': row.activeArrow === 'up'}" @click="activeToggle(row, 'up')">&#8593;</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TableColumn",
        props: {
            label: {
                type: String,
                default: ''
            },
            sortable: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                row: {}
            }
        },
        mounted() {
            this.row = this.$attrs.row || {}
        },
        methods: {
            activeToggle(item, arrowText) {
                this.$set(item, 'activeArrow', arrowText)
                this.$emit('sort', item.attrs.prop, arrowText)
            }
        }
    }
</script>

<style scoped>
    .inline-block{
        display: inline-block;
    }

    .pointer:hover{
        cursor: pointer;
    }
</style>
