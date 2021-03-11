#!/usr/bin/env node
// 定制命令行界面
const program = require('commander')
program.version(require('../package.json').version)
program.command('init <name>')
    .description('init project')
    .action(require('../lib/init'))
    /*.action(name => {
        console.log('init ' + name)
    })*/
program.parse(process.argv)
console.log('cli', process.argv)

