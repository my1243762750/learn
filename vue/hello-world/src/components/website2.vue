<template>
    <div class="website-container">
        <header class="header">
            <span class="my-btn-default" @click="initWebsiteList">取消</span>
            <span class="my-btn-primary" style="margin-left: 10px;" @click="saveWebsiteList(websiteList)">保存</span>
            <span class="my-btn-primary" style="margin-left: 10px;" @click="addWebsiteType(websiteList)">添加分类</span>
        </header>
        <!--所有网站-->
        <section class="website-list-container" v-for="(item, index) in websiteList" :key="index">
            <div class="website-type-header">
                <h4>{{ item.typeName }}</h4>
                <span class="my-btn-primary" style="margin-left: 10px;" @click="addWebsite(websiteList)">添加网站</span>
            </div>
            <dl @drop.prevent="parentDragDrop(item, index)" @dragover.prevent="parentDragOver">
                <dd v-for="(childItem, childIndex) in item.list"
                    :key="childIndex" draggable="true"
                    @drop.stop.prevent="dragDrop(item.typeCode, childIndex, index)"
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
                this.websiteList = [
                    {
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
                    }, {
                        url: 'https://www.zhihu.com/',
                        title: '知乎'
                    }, {
                        url: 'https://segmentfault.com/',
                        title: 'segmentfault'
                    }, {
                        url: 'http://muhu28.com/',
                        title: '牧虎网'
                    }, {
                        url: 'http://gold.xitu.io/',
                        title: '掘金'
                    }, {
                        url: 'https://www.zhihu.com/',
                        title: '知乎'
                    }, {
                        url: 'http://www.miaov.com/',
                        title: '秒味课堂'
                    }, {
                        url: 'https://www.awesomes.cn/weuse',
                        title: '我们在用'
                    }, {
                        url: 'http://www.open-open.com/lib/',
                        title: '深度开发OPEN经验'
                    }, {
                        url: 'http://www.imooc.com/',
                        title: '慕课网'
                    }, {
                        url: 'http://www.jikexueyuan.com/',
                        title: '极客学院'
                    }, {
                        url: 'http://www.bootcdn.cn/',
                        title: 'bootcdn'
                    }, {
                        url: 'http://www.jianshu.com/p/53a7da454057',
                        title: '前端工程师必备实用网站'
                    }, {
                        url: 'http://www.jianshu.com/p/6cb49271cd2a#',
                        title: '史上最全的前端资源大汇总'
                    }, {
                        url: 'https://www.shiyanlou.com/',
                        title: '实验楼'
                    }, {
                        url: 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/A_re-introduction_to_JavaScript',
                        title: '重新认识javascript'
                    }, {
                        url: 'https://github.com/markyun/My-blog/blob/master/Front-end-Developer-Questions/Questions-and-Answers/README.md',
                        title: '前端面试'
                    }, {
                        url: 'http://lib.csdn.net/base/javascript',
                        title: 'javascript'
                    }, {
                        url: 'http://www.alloyteam.com/2012/10/common-javascript-design-patterns/',
                        title: 'js设计模式'
                    }, {
                        url: 'https://www.awesomes.cn/repos/Applications/testings',
                        title: '前端测试'
                    }, {
                        url: 'https://developer.mozilla.org/zh-CN/',
                        title: 'MDN'
                    }, {
                        url: 'http://gold.xitu.io/post/582c7d330ce463006ce33838',
                        title: 'Javascript 本地存储小结'
                    }, {
                        url: 'http://mp.weixin.qq.com/s?__biz=MjM5MDk5MzE2Mw==&mid=2527294468&idx=1&sn=d35cfa44eb44c6b38fb1dcd38fa186d5&chksm=b5eb8a60829c0376f5e74219768bfad897e335af4fb727dde90ba47cb2282584f5e59f2d689a&mpshare=1&scene=1&srcid=1116Zr82InAZPI1Jr20jz4Dt#rd',
                        title: '要么css牛逼，要么js牛逼'
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
                }, {
                    typeCode: '004',
                    typeName: '搜索引擎',
                    list: [{
                        url: 'http://cn.bing.com/',
                        title: '必应'
                    }, {
                        url: 'http://www.yahoo.cn/',
                        title: '雅虎'
                    }, {
                        url: 'http://www.iask.com',
                        title: '爱问(新浪)'
                    }, {
                        url: 'http://www.soso.com',
                        title: 'soso(腾讯)'
                    }, {
                        url: 'https://www.baidu.com/',
                        title: '百度'
                    }]
                }, {
                    typeCode: '005',
                    typeName: '学习方法',
                    list: [{
                        url: 'http://www.360doc.com/content/16/0501/13/2355900_555355479.shtml',
                        title: '学习方法'
                    }]
                }, {
                    typeCode: '006',
                    typeName: 'Unicode®字符百科',
                    list: [{
                        url: 'http://unicode-table.com/cn/#control-character',
                        title: '特殊字符'
                    }]
                }, {
                    typeCode: '007',
                    typeName: '浏览器内核和js引擎',
                    list: [{
                        url: 'http://www.cnblogs.com/xiyangbaixue/archive/2014/10/22/4042548.html',
                        title: '浏览器内核和js引擎1'
                    },{
                        url: 'http://www.nowamagic.net/librarys/veda/detail/1579',
                        title: '浏览器内核和js引擎2'
                    }]
                }, {
                    typeCode: '008',
                    typeName: 'seo优化',
                    list: [{
                        url: 'http://wenku.baidu.com/link?url=j2zHbI-JaVZg4FUR3cw_6VG8wmiioekm3zXEMfRfTLaFcb1puXO1nMoARfvF-THYXFs9VcT3_asi1E6n9YjTB3lb09uwLUUzl4tpFQJPoyK',
                        title: 'seo优化1'
                    },{
                        url: 'http://uxc.360.cn/archives/984.html',
                        title: 'seo优化2'
                    }]
                }, {
                    typeCode: '009',
                    typeName: 'ui用户体验',
                    list: [{
                        url: 'http://bbs.tianya.cn/post-444-46378-1.shtml',
                        title: 'UI设计：用户体验三要素'
                    },{
                        url: 'http://wenku.baidu.com/link?url=BiwlQX5GAD4-m2YJ9LvoZMHfPaffXgp9QOHDR4CHrG84csHj0YroPR-qvnWi0yAfnsv-_iJ35yuq7-bgBrQhVq_m8riCYRR2r2TQKdpTUzu',
                        title: '用户体验'
                    }]
                }, {
                    typeCode: '010',
                    typeName: '前端所有知识体系',
                    list: [{
                        url: 'https://github.com/zdd1124/Front-end-tutorial',
                        title: '前端知识体系'
                    }]
                }, {
                    typeCode: '011',
                    typeName: '扁平化',
                    list: [{
                        url: 'http://www.ruanyifeng.com/blog/2015/03/react.html',
                        title: 'react'
                    }, {
                        url: 'https://color.adobe.com/zh/create/color-wheel/',
                        title: '扁平化1'
                    }, {
                        url: 'http://mobile.51cto.com/design-411108.htm',
                        title: '扁平化2'
                    }]
                }, {
                    typeCode: '012',
                    typeName: '图标',
                    list: [{
                        url: 'http://www.missyuan.net/school/web_2014/web_13752.html',
                        title: '图形'
                    }, {
                        url: 'http://www.iconfont.cn/',
                        title: 'iconfont'
                    }, {
                        url: 'http://icongal.com/',
                        title: 'icongal'
                    }, {
                        url: 'https://thenounproject.com/',
                        title: 'thenounproject'
                    }]
                }, {
                    typeCode: '013',
                    typeName: '图形绘画工具',
                    list: [{
                        url: 'http://zh.numberempire.com/graphingcalculator.php',
                        title: '绘画'
                    }, {
                        url: 'http://zuotu.91maths.com/',
                        title: '91maths'
                    }]
                }, {
                    typeCode: '014',
                    typeName: '编码规范',
                    list: [{
                        url: 'http://www.jianshu.com/p/8d291d823cc0',
                        title: '规范1'
                    }, {
                        url: 'http://my.oschina.net/u/1398304/blog/305484',
                        title: '规范2'
                    }, {
                        url: 'http://www.php100.com/common-functions/webkaifa/javascript/2012/0616/10550.html',
                        title: '规范3'
                    }, {
                        url: 'http://www.cnblogs.com/whitewolf/p/4491707.html',
                        title: '规范4'
                    }, {
                        url: 'http://www.css88.com/archives/5505',
                        title: '规范5'
                    }]
                }, {
                    typeCode: '015',
                    typeName: '压缩图片工具',
                    list: [{
                        url: 'https://tinypng.com/',
                        title: 'TinyPNG'
                    }]
                }, {
                    typeCode: '016',
                    typeName: 'vue登录验证',
                    list: [{
                        url: 'https://github.com/QDMarkMan/vue-base-template/blob/master/src/interception.js',
                        title: 'vue beforeEach 控制登录'
                    }, {
                        url: 'https://cn.vuejs.org/v2/guide/state-management.html',
                        title: 'vuex'
                    }]
                }, {
                    typeCode: '017',
                    typeName: 'vue登录验证',
                    list: [{
                        url: 'https://open.weixin.qq.com/cgi-bin/index?t=home/index&lang=zh_CN',
                        title: '微信开放平台1'
                    }, {
                        url: 'https://mp.weixin.qq.com/?token=&lang=zh_CN',
                        title: '微信公众平台2'
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
                this.$message({
                    type: 'success',
                    message: '保存成功'
                })
            },
            // 添加分类
            addWebsiteType() {
              console.log('添加分类')
            },
            // 添加网站
            addWebsite() {
              console.log('添加网站')
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

<style scoped rel="stylesheet/scss" lang="scss">
$websiteItemSpace: 10px;
$websiteItemWidth: 10%;
$websiteItemHeight: 50px;
$websiteItemBGColor: palevioletred;
.website-container{
    .header{
        display: flex;
        justify-content: center;
        align-items: center;
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