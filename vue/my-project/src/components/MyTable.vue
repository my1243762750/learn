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
                    <my-table-column :sortable="child.attrs.sortable" :label="child.label" :row="child" @sort="sort"></my-table-column>
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
                    <my-table-column :label="item[child.attrs.prop]"></my-table-column>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import MyTableColumn from "./MyTableColumn";
    export default {
        name: "Table",
        components: {
            MyTableColumn
        },
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
            console.log(this)
            this.initList()
        },
        methods: {
            getKey(item) {
                return JSON.stringify(item) || Date.now()
            },
            isShowSortable(obj, key) {
                return Object.prototype.hasOwnProperty.call(obj, key)
            },
            sort(prop, arrowText) {
                this.data = this.data.sort((item1, item2) => {
                    if (arrowText === 'down') {
                        return new Date(item1[prop]).getTime() - new Date(item2[prop]).getTime()
                    } else {
                        return new Date(item2[prop]).getTime() - new Date(item1[prop]).getTime()
                    }
                })
                console.log('排序', this.data)
            },
            initList() {
                this.list = []
                for (let i = 0; i < this.$children.length; i++) {
                    let item = this.$children[i] || {}
                    this.list.push({
                        id: i + 1,
                        label: item.label,
                        attrs: Object.assign({}, item.$attrs, item.$props)
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
