<template>
    <div class="website-container">
        <header class="header">
            <span class="my-btn-default" @click="initWebsiteList">取消</span>
            <span class="my-btn-primary" style="margin-left: 10px;" @click="saveWebsiteList(websiteList)">保存</span>
        </header>
        <!--所有网站-->
        <section v-for="(item, index) in websiteList" :key="index">
            <h2>{{ item.typeName }}</h2>
            <dl @drop.prevent="parentDragDrop(item)" @dragover.prevent="parentDragOver">
                <dd v-for="(childItem, childIndex) in item.list"
                    :key="childIndex" draggable="true"
                    @drop.stop.prevent="dragDrop(item.typeCode, childIndex)"
                    @dragover.stop.prevent="dragOver()"
                    @dragstart.stop="dragStart(item.typeCode, childIndex, childItem)">
                    <div class="website-item-container">
                        <a class="website-item" :href="childItem.url">{{ childItem.title }}</a>
                    </div>
                </dd>
            </dl>
        </section>
    </div>
</template>

<script>
    export default {
        name: "website",
        data() {
            return {
                currentWebsite: {}, // 当前网站
                currentTypeCode: '', // 当前标签分类code
                currentIndex: 0, // 当前标签code
                websiteList: [] // 所有网站列表
            }
        },
        created() {
            // 初始化网址
            this.initWebsiteList()
        },
        methods: {
            // 初始化网址
            initWebsiteList() {
                this.websiteList = [{
                    typeCode: '001',
                    typeName: '常用网站',
                    list: []
                }, {
                    typeCode: '002',
                    typeName: '前端好的网站',
                    list: [{
                        url: 'https://www.metinfo.cn/faq/shownews1418.htm',
                        title: '网站分类'
                    }, {
                        url: 'https://juejin.im/post/5a0c1956f265da430a501f51',
                        title: '个人分享'
                    }, {
                        url: 'http://www.w3cfuns.com/',
                        title: '前端网'
                    }, {
                        url: 'http://kb.cnblogs.com/list/1002/',
                        title: '博客园'
                    }, {
                        url: 'http://www.oschina.net',
                        title: '开源中国社区'
                    }]
                }, {
                    typeCode: '003',
                    typeName: '在线编辑器',
                    list: [{
                        url: 'http://jsbin.com/cepoyekopo/edit?common-functions,css,js,output',
                        title: 'jsbin'
                    }, {
                        url: 'https://jsfiddle.net/',
                        title: 'jsfiddle'
                    }, {
                        url: 'http://runjs.cn/',
                        title: 'runjs'
                    }, {
                        url: 'http://ideone.com/',
                        title: 'ideone'
                    }]
                }]
                // 获取网站
                let websiteList = window.localStorage.getItem('websiteList')
                if (websiteList) {
                    websiteList = JSON.parse(websiteList) || []
                    websiteList.length && (this.websiteList = websiteList)
                }
            },
            // 保存网站(暂时保存在localStorage)
            saveWebsiteList(list) {
                window.localStorage.setItem('websiteList', JSON.stringify(list))
            },
            // 拖动开始
            dragStart(code, index, item) {
                console.log('拖动开始')
                this.currentTypeCode = code
                this.currentIndex = index
                this.currentWebsite = item
            },
            // 拖动结束
            dragOver() {},
            // 放下
            dragDrop(code, insertIndex) {
                console.log('拖动放下', event)
                this.websiteList.forEach((item) => {
                    // 开始处-删除拖动对象
                    if (item.typeCode === this.currentTypeCode) {
                        item.list.splice(this.currentIndex, 1)
                    }
                    // 结束处-添加拖动对象
                    if (item.typeCode === code) {
                        const list = []
                        item.list.forEach((childItem, listIndex) => {
                            if (listIndex === insertIndex) {
                                list.push(this.currentWebsite)
                            }
                            list.push(childItem)
                        })
                        if (insertIndex >= item.list.length) {
                            list.push(this.currentWebsite)
                        }
                        item.list = list
                    }
                })
                console.log('改变后数组是', this.websiteList)
            },
            // 父容器拖动结束
            parentDragOver() {},
            // 父容器放下
            parentDragDrop(item) {
                console.log('父容器拖动放下')
                this.websiteList.forEach((item) => {
                    // 开始处-删除拖动对象
                    if (item.typeCode === this.currentTypeCode) {
                        item.list.splice(this.currentIndex, 1)
                    }
                })
                // 数组最后-添加拖动对象
                item.list.push(this.currentWebsite)
            }
        }
    }
</script>

<style scoped rel="stylesheet/scss" lang="scss">
$websiteItemSpace: 10px;
$websiteItemWidth: 10%;
$websiteItemHeight: 60px;
$websiteItemBGColor: palevioletred;
.website-container{
    .header{
        display: flex;
        justify-content: center;
        align-items: center;

        .my-btn-default{
            padding: 10px 25px;
            border-radius: 4px;
            background-color: #eee;

            &:hover{
                cursor: pointer;
            }
        }

        .my-btn-primary{
            @extend .my-btn-default;
            background-color: deepskyblue;
            color: #fff;
        }
    }

    dl{
        display: flex;
        flex-wrap: wrap;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        border: #ccc 1px dashed;
        min-height: $websiteItemHeight + $websiteItemSpace + 2px;
    }

    dl dd{
        width: $websiteItemWidth;
        margin: 0;
        padding: $websiteItemSpace / 2;
        box-sizing: border-box;

        .website-item-container{
            display: flex;
            align-items: center;
            justify-content: center;
            height: $websiteItemHeight;
            box-sizing: border-box;
            border: solid 1px $websiteItemBGColor;
            background-color: $websiteItemBGColor;
            border-radius: 4px;
            width: 100%;

            .website-item{
                color: #fff;
                font-weight: bold;
            }
        }

        &:hover{
            cursor: move;
        }
    }
}
</style>