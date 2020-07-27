const { compilation } = require("webpack")

class CopyrightWebpackPlugin{                    //本质上插件是一个类，所以每次都要new
    constructor(option){                          //option:插件接受的参数
        console.log(option)
    }

    apply(compiler){                          //compiler:webpack实例，存储webpack的内容
        compiler.hooks.emit.tapAsync('CopyrightWebpackPlugin',(compilation,cb)=>{      //compilation存放这次打包的所有内容
            //打包的结果在assets里面
            compilation.assets['copyright.txt']={                        //webpack调试:package.json debug,基于node对打包过程进行断点调试
                source:function(){
                    return 'copyright by gjq'
                },
                size:function(){
                    return 20
                }
            }
            cb()
        } )                        //webpack钩子emit/fail,compile等
    }
}
module.exports = CopyrightWebpackPlugin