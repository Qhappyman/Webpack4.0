//生产环境和开发环境共同的配置
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');    //生成html文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin')   //cnpm install clean-webpack-plugin -d  自动清除上一次打包的文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin')   //这个插件适合在生产环境中使用，因为目前不支持HMR
const OptimizeCSSAssrtsPlugin = require('optimize-css-assets-webpack-plugin')   //压缩打包的css文件
const webpack = require('webpack')
const merge = require('webpack-merge');          //cnpm install --save-dev webpack-merge
const devConfig = require('./webpack.config.js')
const prodConfig = require('./webpack.prod.js')
const commonConfig = {

}

module.exports=(env) => {    //根据环境选择配置文件:package.json需要配置："prod":"webpack --env.production --config webpack.common.js"
    if(env && env.production){                                                         //env声明环境变量，config指定使用哪一个配置文件
        return merge(commonConfig,prodConfig);
    }
    else{
        return merge(commonConfig,devConfig);
    }
}