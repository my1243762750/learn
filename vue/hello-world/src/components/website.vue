<template>
    <div class="website-container">
        <header class="header" ref="websiteHeader">
            <div class="operate-container" style="padding: 10px 0;">
                <span class="my-btn-default" @click="initWebsiteList">取消</span>
                <span class="my-btn-primary margin-left-10" @click="saveWebsiteList(websiteList)">保存</span>
                <span class="my-btn-primary margin-left-10" @click="openWebsiteTypeDialog('添加')">添加分类</span>
            </div>
            <section class="website-list-container"
                     v-for="(item, index) in [websiteList[0]]"
                     :key="item.typeCode"
                     style="padding:0 8px;">
                <div class="website-type-header">
                    <h4>{{ item.typeName }}</h4>
                    <div>
                        <el-button type="primary" class="margin-left-10" @click="deleteWebsiteType(index)">
                            <i class="el-icon-delete"></i>
                        </el-button>
                        <el-button type="primary" class="margin-left-10" @click="openWebsiteTypeDialog('编辑', item, index)">
                            <i class="el-icon-edit"></i>
                        </el-button>
                        <el-button type="primary" class="margin-left-10" @click="openWebsiteDialog(item, 'add')">
                            <i class="el-icon-plus"></i>
                        </el-button>
                    </div>
                </div>
                <dl class="website-dl"
                    @drop.prevent="parentDragDrop(item, index)"
                    @dragover.prevent="parentDragOver">
                    <dd v-for="(childItem, childIndex) in item.list"
                        :key="childIndex" draggable="true"
                        @drop.stop.prevent="dragDrop(item.typeCode, childIndex, index)"
                        @dragover.stop.prevent="dragOver()"
                        @dragstart.stop="dragStart(item.typeCode, childIndex, childItem)">
                        <el-popover
                                placement="top"
                                width="160"
                                trigger="hover"
                                v-model="childItem.visible">
                            <div style="text-align: center; margin: 0">
                                <el-button type="primary" size="mini" @click="deleteWebsite(item, childIndex)">
                                    <i class="el-icon-delete"></i>
                                </el-button>
                                <el-button type="primary" size="mini" @click="openWebsiteDialog(item, 'update', childItem, childIndex)">
                                    <i class="el-icon-edit"></i>
                                </el-button>
                            </div>
                            <div class="website-item-container" slot="reference">
                                <a class="website-item" :href="childItem.url" @click.prevent="moveToWebsite(childItem.url)">{{ childItem.title }}</a>
                            </div>
                        </el-popover>
                    </dd>
                </dl>
            </section>
        </header>
        <!--所有网站-->
        <div class="body" :style="{'margin-top': bodyMarginTop}">
            <section class="website-list-container"
                     v-for="(item, index) in websiteList"
                     v-if="index > 0"
                     :key="item.typeCode">
                <div class="website-type-header">
                    <h4>{{ item.typeName }}</h4>
                    <div>
                        <el-button type="primary" class="margin-left-10" @click="deleteWebsiteType(index)">
                            <i class="el-icon-delete"></i>
                        </el-button>
                        <el-button type="primary" class="margin-left-10" @click="openWebsiteTypeDialog('编辑', item, index)">
                            <i class="el-icon-edit"></i>
                        </el-button>
                        <el-button type="primary" class="margin-left-10" @click="openWebsiteDialog(item, 'add')">
                            <i class="el-icon-plus"></i>
                        </el-button>
                    </div>
                </div>
                <dl class="website-dl"
                    @drop.prevent="parentDragDrop(item, index)"
                    @dragover.prevent="parentDragOver">
                    <dd v-for="(childItem, childIndex) in item.list"
                        :key="childIndex" draggable="true"
                        @drop.stop.prevent="dragDrop(item.typeCode, childIndex, index)"
                        @dragover.stop.prevent="dragOver()"
                        @dragstart.stop="dragStart(item.typeCode, childIndex, childItem)">
                        <el-popover
                                placement="top"
                                width="160"
                                trigger="hover"
                                v-model="childItem.visible">
                            <div style="text-align: center; margin: 0">
                                <el-button type="primary" size="mini" @click="deleteWebsite(item, childIndex)">
                                    <i class="el-icon-delete"></i>
                                </el-button>
                                <el-button type="primary" size="mini" @click="openWebsiteDialog(item, 'update', childItem, childIndex)">
                                    <i class="el-icon-edit"></i>
                                </el-button>
                            </div>
                            <div class="website-item-container" slot="reference">
                                <a class="website-item" :href="childItem.url" @click.prevent="moveToWebsite(childItem.url)">{{ childItem.title }}</a>
                            </div>
                        </el-popover>
                    </dd>
                </dl>
            </section>
        </div>

        <!--添加/编辑分类（使用element组件）-->
        <el-dialog
                :title="websiteTypeTitle + '分类'"
                :visible.sync="websiteTypeDialog"
                @closed="resetWebsiteTypeForm()"
                width="30%">
            <el-form label-width="80px">
                <el-form-item label="分类名称">
                    <el-input v-model="websiteTypeForm.typeName"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="websiteTypeDialog = false">取 消</el-button>
                <el-button type="primary" @click="websiteTypeSubmit()">确 定</el-button>
            </div>
        </el-dialog>

        <!--添加/编辑网站（使用element组件）-->
        <el-dialog
                title="添加网站"
                :visible.sync="websiteDialog"
                width="30%">
            <el-form label-width="80px">
                <el-form-item label="网站名">
                    <el-input v-model="websiteForm.title"></el-input>
                </el-form-item>
                <el-form-item label="网站链接">
                    <el-input v-model="websiteForm.url"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="websiteDialog = false">取 消</el-button>
                <el-button type="primary" @click="websiteSubmit()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import menu from '@/assets/menuData/menu.json'
    export default {
        name: "website",
        data() {
            return {
                operateWebsiteType: '', // 操作网站类型
                websiteTypeForm: {
                    typeCode: '',
                    typeName: '',
                    list: []
                }, // 添加/编辑网站分类表单
                websiteForm: {
                    title: '',
                    url: '',
                    visible: ''
                }, // 添加/编辑网站表单
                websiteTypeDialog: false, // 添加/编辑网站分类模态框
                websiteTypeTitle: '', // 添加/编辑网站分类标题
                websiteDialog: false, // 添加/编辑网站模态框
                currentWebsite: {}, // 当前网站
                currentTypeCode: '', // 当前网站分类code
                currentIndex: 0, // 当前网站下标
                currentTypeIndex: 0, // 当前网站分类下标
                websiteList: [], // 所有网站列表
                bodyMarginTop: '0' // body距离头部高度
            }
        },
        computed: {

        },
        created() {
            // 初始化网址
            this.initWebsiteList()
        },
        mounted() {
            // 初始化body距离header高度
            this.initBodyMarginTop()
        },
        methods: {
            // 初始化body距离header高度
            initBodyMarginTop() {
                if (this.$refs.websiteHeader) {
                    this.bodyMarginTop = window.getComputedStyle(this.$refs.websiteHeader).height
                } else {
                    this.bodyMarginTop = '0'
                }
            },
            // 跳转网址
            moveToWebsite(url) {
                window.open(url, '_blank')
            },
            // 初始化网址
            initWebsiteList() {
                // 获取网站
                let websiteList = window.localStorage.getItem('websiteList')
                if (websiteList) {
                    websiteList = JSON.parse(websiteList) || []
                    websiteList.length && (this.websiteList = websiteList)
                }
                console.log('获取到的菜单是', menu)
                this.websiteList = menu
            },
            // 保存网站(同事保存在localStorage和menu.json)
            saveWebsiteList(list) {
                window.localStorage.setItem('websiteList', JSON.stringify(list))
                // const url = 'http://localhost:9001/saveMenu'
                const url = 'http://172.16.11.55:9001/saveMenu'
                this.request(url, list, () => {

                })
                this.$message({
                    type: 'success',
                    message: '保存成功'
                })
            },
            // 请求
            request(url, params, callback) {
                var xhr = new XMLHttpRequest();
                xhr.open('POST', url, true);
                xhr.setRequestHeader('Content-Type','application/json');
                xhr.setRequestHeader('Accept','application/json');
                xhr.send(JSON.stringify(params));
                xhr.onload = function () {
                    // 以获取json数据为例
                    var res = JSON.parse(this.responseText);
                    console.log('返回的结果是')
                    if (res.success) {
                        callback && callback()
                    }
                };
            },
            // 打开添加网站分类模态框
            openWebsiteTypeDialog(title, item, index) {
                this.websiteTypeTitle = title
                if (item) {
                    this.websiteTypeForm = JSON.parse(JSON.stringify(item))
                    this.currentTypeIndex = index
                }
                this.websiteTypeDialog = true
            },
            // 添加网站分类确定
            websiteTypeSubmit() {
                if (!this.websiteTypeForm.typeName) {
                    this.$message({
                        type: 'warning',
                        message: '请输入分类名称'
                    })
                    return
                }
                // 编辑逻辑
                if (this.websiteTypeForm.typeCode) {
                    this.websiteList[this.currentTypeIndex] = this.websiteTypeForm
                } else {
                    this.websiteTypeForm.typeCode = this.getRandomNumber()
                    this.websiteList.push(this.websiteTypeForm)
                }
                this.websiteTypeDialog = false
            },
            // 删除网站分类
            deleteWebsiteType(index) {
                this.websiteList.splice(index, 1)
            },
            // 打开网站模态框
            openWebsiteDialog(item, operateWebsiteType, childItem, childIndex) {
                if (childItem) {
                    this.websiteForm = childItem
                    this.currentIndex = childIndex
                }
                this.websiteTypeForm = item
                this.operateWebsiteType = operateWebsiteType
                this.websiteDialog = true
            },
            // 添加网站确定
            websiteSubmit() {
                if (!this.websiteForm.title) {
                    this.$message({
                        type: 'warning',
                        message: '请输入网站名'
                    })
                    return
                }
                if (!this.websiteForm.url) {
                    this.$message({
                        type: 'warning',
                        message: '请输入网站链接'
                    })
                    return
                }
                if (this.operateWebsiteType === 'update') {
                    this.websiteTypeForm.list[this.currentIndex] = this.websiteForm
                } else {
                    this.websiteTypeForm.list.push(this.websiteForm)
                }
                this.websiteDialog = false
                this.resetWebsiteForm()
            },
            // 重置当前网站
            resetWebsiteForm() {
                this.websiteForm = {
                    title: '',
                    url: '',
                    visible: ''
                }
            },
            // 重置当前网站分类
            resetWebsiteTypeForm() {
                this.websiteTypeForm = {
                    typeCode: '',
                    typeName: '',
                    list: []
                }
            },
            // 删除网站
            deleteWebsite(item, index) {
                item.list.splice(index, 1)
                console.log('删除网站')
            },
            // 获取随机数
            getRandomNumber() {
                const time = Date.now()
                return 'my' + time
            },
            // 拖动开始
            dragStart(code, index, item) {
                console.log('拖动开始')
                this.currentTypeCode = code
                this.currentIndex = index
                this.currentWebsite = JSON.parse(JSON.stringify(item))
            },
            // 拖动结束
            dragOver() {},
            // 放下
            dragDrop(code, insertIndex, parentIndex) {
                parentIndex === 0 && this.websiteList.forEach((item) => {
                    // 结束处-添加拖动对象
                    if (item.typeCode === code) {
                        // 是否可以插入网站
                        const isExistWebsite = this.websiteList[0].list.find((item) => {
                            return item.title === this.currentWebsite.title && item.url === this.currentWebsite.url
                        })
                        if (isExistWebsite) {
                            return
                        }
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
            parentDragDrop(item, parentIndex) {
                console.log('父容器拖动放下')
                if (parentIndex === 0) {
                    // 是否可以插入网站
                    const isExistWebsite = this.websiteList[0].list.find((item) => {
                        return item.title === this.currentWebsite.title && item.url === this.currentWebsite.url
                    })
                    if (!isExistWebsite) {
                        // 数组最后-添加拖动对象
                        item.list.push(this.currentWebsite)
                    }
                }
            }
        }
    }
</script>

<style scoped lang="scss">
$websiteItemSpace: 10px;
$websiteItemWidth: 10%;
$websiteItemHeight: 50px;
$websiteItemBGColor: palevioletred;
$fixContentBGC: paleturquoise;
$fixContentBGCOpacity: .7;
$headerPadding: 10px;
$firstWebsiteItemTypePaddingBottom: 15px;
.margin-left-10{
    margin-left: 10px;
}
.website-container{
    .header{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        background-color: $fixContentBGC;

        .operate-container{
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

    .body{
        margin-top: 61.25px;
    }

    .website-list-container{
        .website-type-header{
            display: flex;
            align-items: center;
            justify-content: space-between;
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
</style>