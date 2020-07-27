// import * as math from './math'
// import * as string from './string'
// export default {math,string}

(function(){console.log(1)})();
if('serviceWorker' in navigator){              //使用PWA serviceWork后第一次访问页面后，即使服务器断开连接也能显示上一次的内容
    window.addEventListener('click',()=>{
        navigator.serviceWorker.register('/service-worker.js')
        .then(registeration=>{
            console.log('service-worker-success')
        })
        .catch(error=>{
            console.log('service-worker fail')
        })
    })
}
console.log(123)