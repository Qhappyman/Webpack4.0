//这个文件用于创建一个图片，验证css moudles
import ava from './ava.jpg'
function createAva(){
    let img = new Image();
img.src=ava
img.classList.add('ava')
let root = document.getElementById('root');
root.append(img)
}

export default createAva