//本不该是这个文件作为配置文件，解决：npx webpack --config webpackconfig.js
const path = require('path') 
module.exports = {
    entry:'./index.js',
    output:{
        filename:'bule.js',                               //npx webpack打包
        path: path.resolve(__dirname,'bundle')             //绝对路径__dirname是当前目录，与bundle结合生成绝对路径
    }
}