// import 'babel-polyfill' // 看babel.config.js
// import 'core-js/stable' // 看babel.config.js文件
// import 'regenerator-runtime/runtime' // 看babel.config.js文件

const fn2 = () => {
    console.log('hello world2')
}
const result2 = Promise.resolve(2);
result2.then((res2) => {
    console.log(res2)
})

console.log([1,2,3].includes(12))

const say2 = async () => {
    await fn2()
}
