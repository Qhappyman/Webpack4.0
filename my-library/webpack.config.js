const WorkboxPlugin = require('workbox-webpack-plugin')  //引入PWA配置插件
const path = require('path')
module.exports={
    mode:"production",
    entry:'./src/index.js',
    externals:["lodash"],                       //我们创建的library中引入了lodash库，用户使用时可以自动引入，这里说明打包时不要把lodash也打包进去，减少文件体积，，详细webpack官网配置
    output:{
        filename:'library.js',
        path:path.resolve(__dirname,'dist'),
        library:'library',                       //全局变量增加library变量，通过script标签也可以引入
        libraryTarget:'umd'                     //指定library的挂载位置this/node，声明不管以COMMON.js，AMD等任何方式引入libray库，都可以引入的到
    },
    plugins:[
        new WorkboxPlugin.GenerateSW({
            clientsClaim:true,                    //PWA底层是h5的servicework
            skipWaiting:true
        })
    ]
}