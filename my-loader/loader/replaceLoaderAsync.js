const loaderUtils = require('loader-utils');       //webpack提供的loader工具，页面语言选择可以使用loader来处理
const { SourceMapDevToolPlugin } = require('webpack');
module.exports = function (source){           //不能使用箭头函数，防止内部this被改变,source为引入的文件的内容
    // console.log(this.query)                  //获取到source传递过来的参数,this里面包含很多很多的东西
    // return source.replace('hello',this.query.name)

    const options = loaderUtils.getOptions(this);
    const callback = this.async();
    setTimeout(()=>{
        //loader无法处理异步操作，通过async告诉这个loader有异步，然后再用callback将结果返回去
        const result =  source.replace('hello',options.name); 
        callback(null,result);
    },1000)

    //const options = loaderUtils.getOptions(this);
    // const result =  source.replace('hello',options.name)
    // this.callback(null,result)        //通过callback返回多个结果出去
}
//loader就是一个函数

// this.callback(
//     err:Error|null,
//     content:string|Buffer,
//     sourceMap?:SourceMapDevToolPlugin,
//     meta?any
// )