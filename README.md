### Webpack4.0

#### 概念

本质上，webpack 是一个用于现代 JavaScript 应用程序的*静态模块打包工具*。当 webpack 处理应用程序时，它会在内部构建一个 [依赖图(dependency graph)](https://webpack.docschina.org/concepts/dependency-graph/)，此依赖图对应映射到项目所需的每个模块，并生成一个或多个 *bundle*。

#### 基本知识

+ 入口(entry)
+ 出口(output)
+ loader
+ 插件(plugin)
+ 模式(mode)
+ 模块(environment)
+ manifest
+ 内部原理