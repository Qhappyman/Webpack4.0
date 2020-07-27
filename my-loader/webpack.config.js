const path = require('path')

module.exports = {
    mode:'development',
    entry:{
        main:'./src/index.js'
    },
    output:{
        filename:'[name].js',
        path:path.resolve(__dirname,'dist')
    },
    resolveLoader:{         //指定使用loader时先去node-module里面找，然后再去loader目录下找
        modules:['node_modules','./loaders']
    },
    module:{
        rules:[{
            test:/\.js/,
            use:[
                {
                    loader:path.resolve(__dirname,'./loader/replaceLoader.js')
                },
                {
                    loader:path.resolve(__dirname,'./loader/replaceLoaderAsync.js'),
                    options:{
                        name:'params'         //将这里的参数传递给loader的query
                    }
                }                             //使用俩次loader，自下而上运行，先使用params将hello代替，然后使用gjq吧params代替
            ]         //使用自己的loader
        }]
    }
}