// 去左空格;
function lTrim(str) {
    return str.replace(/^\s*/g, "");
}

// 去右空格
function rTrim(str) {
    return str.replace(/\s*$/g, "");
}
// 去空格
function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}