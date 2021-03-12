// import 'babel-polyfill' // 看babel.config.js
// import 'core-js/stable' // 看babel.config.js文件
// import 'regenerator-runtime/runtime' // 看babel.config.js文件

const fn1 = () => {
    console.log('hello world1')
}
const result = Promise.resolve(1);
result.then((res) => {
    console.log(res)
})

console.log([1,2,3].includes(1))

const say1 = async () => {
    await fn1()
}
