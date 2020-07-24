//生产环境配置文件
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');    //生成html文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin')   //cnpm install clean-webpack-plugin -d  自动清除上一次打包的文件
const webpack = require('webpack')
module.exports = {
    mode:'production',     //默认打包模式production且压缩打包文件,development不压缩
    devtool:'source-map',           //none将Sourcemap关闭.webpack报错是显示打包结束文件错误位置，希望准确定位使用Sourcemap，将错误映射到源文件,生成main.js.map映射文件
    entry:{
        main:'./src/index.js', 
        // sub:'./src/index.js'
    },           
    output:{
        filename:'[name].js',          //输出多个文件使用占位符                     //npx webpack打包,每次打包形成一个新文件，加入到指定的打包文件夹下，名字相同则覆盖，不同则添加进去，且不会删除以前打包的文件夹和文件
        path: path.resolve(__dirname,'dist')             //绝对路径__dirname是当前目录，与bundle结合生成绝对路径，默认路径是dist,生成dist文件夹，可以不写path
        // publicPath:'http://cdn.com.cn'    //放入后台时，自动在打包的script中加入项目地址
    },
    plugins:[
        new HtmlWebpackPlugin({            //plugin相当于生命周期钩子，在webpack打包到某一时刻执行
        template:'src/index.html'        //指定生成的html以哪个文件为模板，会把模板文件的所有内容加入到生成的html中
    }),                                     //index.html即使没有也可以进行打包成功，此插件会在打包结束后自动生成html文件，并把打包后的js(只加入js文件)自动引入这个html中
    new CleanWebpackPlugin(),             //清除上一次的打包文件，打包前执行
    ],     
    module:{                              //只要不是js文件就应该使用loader
        rules:[{
            // test:/\.jpg$/,              //指定遇到jpg文件使用file-loader进行打包
            // use:{
            //     loader:'file-loader',      //原理：先将文件移入dist目录，然后返回文件名给index.js
            //     options:{
            //         //placeholder占位符语法，模板语法
            //         name:'[name].[ext]',    //默认打包后名字为字符串,若想保持原名字:原name+原后缀ext
            //         outputPath:'images/'    //将图片文件打包到一个独立的文件夹中,在dist中创建images文件夹 
            //     }
            // }
        },{
            test:/\.(jpg|png|gif)$/,
            use:{
                loader:'url-loader',          //同样可以打包图片文件，此时，打包的结果是base64的图片且直接加入Bundle.js，目录中并没有
                options:{                      //使用场景：打包小图片，不能使bundle.js过大
                    name:'[name]_[hash].[ext]',
                    outputPath:'images/',
                    limit:10               //这里限制图片大小，2048字节，小于2048，使用url-loader打包到bundle.js，大于2048，打包到images文件中
                }
            }
        },{
            test:/\.css$/,                          //loader执行：从下到上，从右到左，所以css-loader必须在后面，style-loader必须在前面
            use:['style-loader',
            {
                loader:'css-loader',
                options:{
                    importLoaders:1,          //告诉只要以有以import导入的css文件都要执行下面n个loader，防止跳过失误
                    modules:true              //保证css文件之间的样式不会有冲突，形成独立作用域，引入方式也变化了:index.js line9
                }
            },
            'postcss-loader'
            ]       //postcss-loader自动为css3样式添加ie适应前缀,解析到postcss查找postcss.config.js中的插件
            //css loader分析css文件之间的关系，合并成一个css，style-loader将css文件挂载到页面的style中 
        },{
            test:/\.scss$/,
            use:{
                loader:'sass-loader'              //打包sass文件不会报错，但是没有sass-loader时会直接将样式挂载到style中，样式内容还是sass格式，浏览器无法理解
            }
        },{
            test:/\.(rot|ttf|svg)$/,
            use:{
                loader:'file-loader'               //打包iconfont等外界字体文件
            }
        },{
            test:/\.js$/,                           //希望多看一下babel官网
            exclude:/node_modules/,               //只有node_modules文件之外的js文佳，才使用babel，因为node_module里面的第三方文件已经转义到es5了,exclude:排斥，省略
            loader:"babel-loader",                   //将webpack和babel进行连接，但这时并不翻译ES6
            options:{
                presets:[["@babel/preset-env",{            ////真正配合babel翻译ES6的包以适应低版本浏览器
                    // target:{                        //告诉打包的代码在哪里运行，chroms67以上会自动翻译ES6，所以webpack就不会翻译ES6，不会打包到main.js，减少文件体积
                        // chrom:"67"                 //这个地方有可能会报错
                    // },
                    // useBuiltIns: 'usage'           //plofill适应更低版本浏览器不具有的ES6代码打包到mian.js时，不会将Es6全部代码打包进去，只打包项目里面用到的，减少了打包文件体积
                }]]
                // "plugins":[["@babel/plugin-transform-runtime",{     //转义UI等类库
                //     "corejs":2,                  //cnpm install --save @babel/runtime-corejs2        
                //     "helpers":true,
                //     "regenerator":true,
                //     "useESModules":false
                // }]]        
            }
        }]
    }
}