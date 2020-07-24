//ES6模块引入语法，浏览器起无法识别
//解决：npx webpack index.js,翻译index.js语法，生成/dist/main.js
//webpack不仅可以识别import模块，CMD,ADM,Common JS 也可以识别
//webpack初衷是打包js->后来css->图片等都可以打包
import Content from './content'
import Header from './header'
import Sidebar from './sidebar'
import ava from './ava.jpg'         //默认打包js，无法打包jpg，配置文件module rules配置
import style from './index.css'            //index.css作用于创建出的俩张图片，但是我们希望并不共享这个css文件，如果引入多个文件，会出现样式冲突,使用模块化css modules
import createAva from './createAva'
import "@babel/polyfill"           //引入babel文件，适应低版本浏览器,z这样打包后的main.js体积将近增大一倍，有低版本浏览器适应代码
// import {add} from './math'          //引入add方法，但是打包时minis方法也打包了进来，解决：Tree Shaking，只打包引入的东西
import _ from 'lodash'             //code splitting
function getComponent(){            //异步引入第三方库,dynamic-import-webpack进行代码分割
    return import(/* webpackChunkName: "lodash"*/'lodash').then(({default:_})=>{        //给分割形成的文件起一个名字，需要babel-plugin-dynamic-import-webpack插件
    let element = document.createElement('div');            //这个异步文件必须单独放到一个文件才会有效，进行异步代码分割,可以将其他注释进行试验
    element.innerHTML = _.join(['dd','bb'],'-');
    return element;
    })
}
document.addEventListener('click',()=>{          //lazy loadign懒加载，一开始浏览器不会加载打包的lodash文件，只有当单击事件发生时才会加载，按需加载
    getComponent().then((element=>{
        document.body.appendChild(element)
    }))
})
console.log(this)
console.log(ava)                 //输出打包后的图片文件名

// add(1,2)

console.log(_.join(['a','b','c']))
//此处省略一万条外部代码
//第三方库加入，打包文件很大，加载时间长；重新加载页面又需要加载main.js的全部内容

createAva();            //这里创建了俩个图片
let img = new Image();
img.src=ava
img.classList.add(style.ava)    //line9变化，这里变为style.ava
let root = document.getElementById('root');
root.append(img)

new Header();
new Sidebar()
new Content();

let promise = new Promise((resolve,reject)=>{
    let x = 1;
    if(x===1){
        resolve();
    }
})
promise.then(()=>{
    console.log('promise')
})