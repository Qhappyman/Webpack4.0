function Content(){
    let dom = document.getElementById('root')
    let content = document.createElement('div');
    content.innerText = 'content';
    dom.append(content);
}

export default Content