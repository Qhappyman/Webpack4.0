const loaderUtils = require('loader-utils');       //webpack提供的loader工具
const { SourceMapDevToolPlugin } = require('webpack');
module.exports = function (source){           //不能使用箭头函数，防止内部this被改变,source为引入的文件的内容
       return source.replace('params','gjq')
}
