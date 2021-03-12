module.exports = {
    presets: [
        /*[
            '@babel/preset-env',
            {
                // 是否使用polyfill 'entry' | 'usage' | false
                useBuiltIns: 'usage',
                // 2 | 3
                // corejs: 2
                corejs: {
                    // 2 | 3
                    version: 2
                },
                targets: {
                    ie: '8'
                },
                modules: 'auto'
            }
        ]*/
        [
            '@babel/preset-env',
            {
                // 是否使用polyfill 'entry' | 'usage' | false
                useBuiltIns: false
            }
        ]
    ],
    plugins: [
        [
            '@babel/plugin-transform-runtime',
            {
                corejs: {
                    version: 3
                }
            }
        ]
    ]
}
