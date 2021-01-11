/**
 * Created by Shinelon on 2016/12/21.
 */
/**
 * 判断滚动条是否滚动到底部
 * @returns {boolean}
 */
function isScrollBottom() {
    var scrollTop = document.documentElement.scrollTop + document.body.scrollTop,//浏览器滚动高度
        clientHeight = 0,//浏览器可视内容高度
        scrollHeight = 0;//浏览器所有内容高度

    if (document.compatMode === "CSS1Compat") {//strict mode
        clientHeight = document.documentElement.clientHeight;
        scrollHeight = document.documentElement.scrollHeight;
    } else if(document.compatMode === "BackCompat") {//quirks mode
        clientHeight = document.body.clientHeight;
        scrollHeight = document.body.scrollHeight;
    }else{
        return false;
    }
    return scrollTop + clientHeight === scrollHeight;
}