// import _ from 'lodash'
// window._ = _;
// //将lodash于与ndex.js分割,打包时分为俩个入口，打包的loadsh.js从main.js中抽离出来，这是手动的代码分割
// //首次加载页面需要加载俩个文件，当业务逻辑变化时，只需重新加载main.js，减少了请求数
// //这就是手动code-splitting,优化项目性能，官方api自动代码分割:splitChunks,生成vendors.main.js将类库单独加入进去

    function getComponent(){            //异步引入第三方库,dynamic-import-webpack进行代码分割
        return import(/* webpackChunkName: "lodash"*/'lodash').then(({default:_})=>{        //给分割形成的文件起一个名字，需要babel-plugin-dynamic-import-webpack插件
        let element = document.createElement('div');
        element.innerHTML = _.join(['dd','bb'],'-');
        return element;
        })
    }
    getComponent().then((element=>{
        document.body.appendChild(element)
    }))
