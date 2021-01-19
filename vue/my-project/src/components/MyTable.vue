<template>
    <div class="border">
        <div ref="hiddenSlot" class="visibility-hidden">
            <slot></slot>
        </div>
        <!--第一行 标题-->
        <table class="width-percent-100">
            <colgroup>
                <col v-for="child in list" :key="getKey(child)" :width="child.attrs.width">
            </colgroup>
            <thead>
            <!--只有一行-->
            <tr>
                <!--循环列-->
                <th class="border" v-for="child in list" :key="getKey(child)">
                    <span>{{ child.label }}</span>
                    <div v-if="isShowSortable(child.attrs, 'sortable')" class="inline-block pointer">
                        <span class="arrow-down" :class="{'arrow-active': child.activeArrow === 'down'}" @click="activeToggle(child, 'down')">&#8595;</span>
                        <span class="arrow-up" :class="{'arrow-active': child.activeArrow === 'up'}" @click="activeToggle(child, 'up')">&#8593;</span>
                    </div>
                </th>
            </tr>
            </thead>
        </table>
        <!--第二行+ 内容-->
        <table class="width-percent-100">
            <colgroup>
                <col v-for="child in list" :key="getKey(child)" :width="child.attrs.width">
            </colgroup>
            <tbody>
            <!--循环行-->
            <tr v-for="item in data" :key="getKey(item)">
                <!--循环列-->
                <td class="border" v-for="child in list" :key="getKey(child)">
                    {{ item[child.attrs.prop] }}
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    // import MyTableColumn from "./MyTableColumn";
    export default {
        name: "Table",
        props: {
            data: {
                type: Array,
                default: () => {
                    return []
                }
            }
        },
        data() {
            return {
                list: []
            }
        },
        mounted() {
            console.log(this, this.$refs['hiddenSlot'].childNodes)
            this.initList()
        },
        methods: {
            getKey(item) {
                return JSON.stringify(item) || Date.now()
            },
            getRowKeys(item) {
                return Object.keys(item)
            },
            activeToggle(item, arrowText) {
                this.$set(item, 'activeArrow', arrowText)
            },
            sort() {

            },
            isShowSortable(obj = {}, key) {
                return Object.prototype.hasOwnProperty.call(obj, key)
            },
            initList() {
                this.list = []
                for (let i = 0; i < this.$children.length; i++) {
                    let item = this.$children[i] || {}
                    this.list.push({
                        id: i + 1,
                        label: item.label,
                        attrs: item.$attrs
                    })
                }
            }
        }
    }
</script>

<style scoped>
table{
    border-collapse:collapse;
}

.visibility-hidden{
    position: relative;
    width: 0;
    height: 0;
    visibility: hidden;
    z-index: -1;
}

.inline-block{
    display: inline-block;
}

.pointer:hover{
    cursor: pointer;
}

.arrow-active{
    color: blue;
}

.border{
    border: solid 1px;
}

.width-percent-100{
    width: 100%;
}
</style>
