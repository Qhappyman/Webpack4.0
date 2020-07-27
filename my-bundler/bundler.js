const fs = require('fs')
const parser = require('@babel/parser')     //调用babel对文件结构进行分析
const traverse = require('@babel/traverse').default   //对ast进行解析
const path = require('path')
const babel = require('@babel/core')
const moduleAnalyser = (filename)=>{               
    const content = fs.readFileSync(filename,'utf-8')
    const ast = parser.parse(content,{                //将index.js形成ast:抽象语法树,babel提供的解析工具,具体见babel官网
        sourceType:'module'
    })
    const dependencies = {}             //存放index.js中的依赖文件
    traverse(ast,{
        ImportDeclaration({node}){         //import语法节点对象
            const dirname = path.dirname(filename)
            const newFile='./' + path.join(dirname,node.source.value)    //将目录与source结合，形成绝对路径
            dependencies[node.source.value] = newFile;                  //将import中的路径保存下来，保存依赖
        }
    })
    console.log(dependencies)
    console.log(ast)
    const {code} = babel.transformFromAst(ast,null,{                     //babel core这个工具将ast抽象语法树转化为浏览器可运行的代码，保存在code里面
        presets:["@babel/preset-env"]
    })
    console.log(code)
    return {
        filename,
        dependencies,
        code
    }
}
const makeDependencesGraph = (entry) => {    //形成所有文件的依赖图谱
    const entryModule = moduleAnalyser(entry);
    const graphArray = [entryModule];        //所有的文件依赖放在这里
    for(let i = 0;i<graphArray.length;i++){     //利用递归寻找所有的文件依赖
        const item = graphArray[i];
        const {dependencies} = item;
        if(dependencies){
            for(let j in dependencies){         //遍历子依赖节点
                graphArray.push(
                    moduleAnalyser(dependencies[j])
                )
            }
        }
    }
    const graph = {}
    
    graphArray.forEach(item=>{          //将依赖数组转化为更直白的依赖对象,描述了模块的依赖关系
        graph[item.filename] = {
            dependencies:item.dependencies,
            code:item.code
        }
    })
    return graph;
    console.log(graph)            //打印依赖对象，图谱
}

const generateCode = (entry)=>{               //递归寻找可执行代码，将require和exports剔除，最终返回执行代码并利用比宝宝执行
    const graph = JSON.stringify(makeDependencesGraph(entry));
    return `
        (function(graph){
            function require(module){                   
                function localRequire(relativePath){
                    return require(graph[module].dependencies[relativePath])
                }
                let exports ={};
                (function(require,exports,code){
                    eval(code);
                })(localQuire,exports,graph[module].code)
                return exports;
            };
            require('${entry}')
        })(${graph})
    `
}
// const moduleInfo = moduleAnalyser('./src/index.js')
// console.log(moduleInfo)

// const graghInfo = makeDependencesGraph('./src/index.js')

const code = generateCode('./src/index.js')         //最终代码1.生成单文件ast，抽离依赖，文件，代码  2.递归生成全部依赖图谱 3.依次生成执行的代码并执行
console.log(111,code)

//ast:
// Node {
//     type: 'File',
//     start: 0,
//     end: 56,
//     loc: SourceLocation {
//       start: Position { line: 1, column: 0 },
//       end: Position { line: 2, column: 20 }
//     },
//     errors: [],
//     program: Node {
//       type: 'Program',
//       start: 0,
//       end: 56,
//       loc: SourceLocation { start: [Position], end: [Position] },
//       sourceType: 'module',
//       interpreter: null,
//       body: [ [Node], [Node] ],
//       directives: []
//     },
//     comments: []
//   }