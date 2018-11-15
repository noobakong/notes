# Module.exports 和 exports

> 在node中，没有全局作用域，只有模块作用域，外部访问不到内部，内部也访问不到外部,那么模块间如何通信

- 当加载一个模块的时候，被加载模块的代码在第一次加载的时候会执行一遍

## module

每一个模块中都会有一个内置的对象 --  **Module**

在一个node文件中打印 module：

`console.log(module)`



```shell
Module {
  id: '.',
  exports: {},
  parent: null,
  filename: 'f:\\生命不息-学习不止\\苦逼码农\\code-demo\\跟学小练习\\node\\test.js',
  loaded: false,
  children: [],
  paths:
   [ 'f:\\生命不息-学习不止\\苦逼码农\\code-demo\\跟学小练习\\node\\node_modules',
     'f:\\生命不息-学习不止\\苦逼码农\\code-demo\\跟学小练习\\node_modules',
     'f:\\生命不息-学习不止\\苦逼码农\\code-demo\\node_modules',
     'f:\\生命不息-学习不止\\苦逼码农\\node_modules',
     'f:\\生命不息-学习不止\\node_modules',
     'f:\\node_modules' ] }
```

- id：模块的唯一标示，根文件为`.`，引入的子模块就是文件的绝对路径
- parent和children：如果a.js 中引入了 b.js 那么a和b的关系就是父子关系
- filename：文件的绝对路径
- paths：模块的地址，与后面的模块查找机制有关
- loaded

其中最为重要的是 module对象中的 `exports` 属性和 `require` 方法



## module.exports

- 被加载模块可以使用 node 提供 的 module.exports  来绝对向外暴露的内容（不设置的话默认为一个空对象）   *module 在node.js 模块中一般都表示本模块的意思*

  > require 函数真是实现：

  ```javascript
  function require(/* ... */) {
    const module = { exports: {} }; // exports 默认为空对象
    ((module, exports) => {
      // 模块代码在这。在这个例子中，定义了一个函数。
      function someFunc() {}
      exports = someFunc;
      // 此时，exports 不再是一个 module.exports 的快捷方式，
      // 且这个模块依然导出一个空的默认对象。
      module.exports = someFunc;
      // 此时，该模块导出 someFunc，而不是默认对象。
    })(module, module.exports);
    return module.exports;
  }
  ```

##　exprot

- `export` 和 `module.exports` 指向的是同一个对象地址

- 最终 `require()` 函数返回的是 `module.exports `  中的数据

  以当 `module.exports` 属性被一个新的对象完全替代时 , `require` 的数据肯定也会变成新值；但是，如果给 `export` 对象改变地址的话， `module.exports`不会改变， `requrie`的值自然也就不会发生变化；**可以将 `export` 想象成 `module.exports` 的快捷方式**

## module.exports与exports的区别


每一个node.js执行文件，都会创建一个module对象，同时，module对象会创建一个叫 exports 的属性，初始化的值是 { }

> module.exports = { }

**在模块的结尾，会将 module.exports 返回**

> return module.exports



本质上两者都是指向一块地址：

```javascript
console.log(module.exports === exports)
// true
```

可以这样理解：

- 默认的 exprots 是 **引用**的 module.exprots的值，两者指向的同一片内存空间
- module.exprots 和 exprots 两个对象任意其一**改变了对象内存地址，两者的相同关系就会断开**
- **模块机制最后导出的返回值 是module.exprots** 而不是 exprots

### 实例解析

同目录下创建两个文件, `a.js`, 和 `b.js`

在`a.js`写入代码, 输出foo来看看b.js导出的模块到底是什么

```javascript
var foo = require('./b')

console.log(foo)
```

- b.js 什么也不写的情况下,

  > { }

  执行a.js 输出 一个空对象， 这也说明了我们的模块默认导出一个空对象

- b.js 代码如下

  ```javascript
  exports.a = 1

  //此时 执行 a.js 输出 ：
  //  { a: 1 }
  ```

- b.js 代码如下

  ```javascript
  module.exports.a = 2

  exports.a = 1

  //此时 执行 a.js 输出 ：
  //  { a: 1 }
  ```

  两句语句的操作其实是操作同一块对象地址，所以以最后的为准 a.js执行输出为1 

- b.js 代码如下

  ```javascript
  module.exports = {
    a : 2
  }

  exports.a = 1

  //此时 执行 a.js 输出 ：
  //  { a: 2 }
  ```

  此时执行结果变为 2  为什么？

  因为第次赋值操作的时候，本质是改变了 moudule.exprots 的地址， 为 module.exports 开辟了一块新的地址来存储数据 ，而 exprots 还是 连接着 原来的共享地址。 而模块最后导出的是 module.exports 这样应该就能理解其中的原因了吧

- 来一个复杂的

  ```javascript
  exports.a = 'aaa'
  // module.exports = {
  //   a: 'aaa'
  // }  
  module.exports.b = 123
  // module.exports = {
  //   a: 'aaa',
  //   b: 123
  // }  

  exports = {
    b: 456
  }
  // 此时 exports 和 module.exprots 断开联系，不再是同一片地址

  module.exports.a = 'hahaha'
  // module.exports = {
  //   a: 'hahaha',
  //   b: 123
  // }  

  exports.c = 456
  // 断开联系 赋值无法作用与 modul.exports

  exports = module.exports
  // 又指向同一片地址

  exports.b = 789
  // module.exports = {
  //   a: 'hahaha',
  //   b: 789
  // } 
  ```

  最后输出  `{ a: 'hahaha', b: 789 }`



## require

require一般导入下列三种包

- 内置核心模块
- 第三方模块
- 用户自己的模块

> 不可能有任何一个第三方包和核心模块的名字是一样的

### 模块查找机制

1. 优先缓存
2. 核心模块
3. 路径形式的文件模块
4. 第三方模块

当 Node 执行 require(A) 时，按下面处理

#### 1.  **当 A 是 内置模块**

   a, 返回该模块

   b, 不在执行

#### 2. **当 A 是 './'   '/'  '../' 开头的路径请求**

   a, 确定 A 所在的父模块， 确定 A 的 绝对路径

   b, 将 A 当成文件 依次查找

   - A
   - A.js
   - A.json
   - A.node

   > 只要其中有一个存在，就返回该文件，不再继续执行

   c, 将 A 当成目录文件夹， 查找 A 文件夹下的下列文件

   - A/package.json

     > 查找package.json下的 main 配置，如果配置 就加载配置路径，否则向下进行查找

   - A/index.js

   - A/index.json

   - A/index.node
#### 3. **当 A 属于第三方模块的时候**
> 假想当前脚本文件 /home/akong/projects/foo.js 执行了 require('bar') 

/home/akong/projects/node_modules/bar
/home/akong/node_modules/bar
/home/node_modules/bar
/node_modules/bar

node 会按照上面的顺序依次向上级的node_modules搜索bar

搜索时，node会先 bar 当成文件名 依次尝试加载下面这些文件，只要有一个成功就返回

```
bar
bar.js
bar.json
bar.node
```

如果都不成功，就将bar当做文件夹，搜索下面的文件

```
bar/package.json（main字段）
bar/index.js
bar/index.json
bar/index.node
```

   

## 杂记

- 在node中，全局模块的使用不需要加载，而非全局模块则需要加载。

  process 模块在使用的时候无需通过 require( )来加载该函数，可以直接使用，而 fs 模块不是全局模块，需要加载来使用  `var fs = require('fs')`  

- Node 即是单线程的，又是异步非阻塞I/O

- data 参数的数据类型是一个 buffer 对象 ，里面保存的就是一个一个的字节（理解为字符数组）
  把buffer对象转化为字符串，用`toString`方法 默认 `utf8`

- 文件操作的 `./` 相对路径，相对的是执行 node 命令的路径

  > 解决：
  >
  > `__durbane`：表示当前正在执行的 js 文件所在的目录
  >
  > `__filename`: 表示当前正在执行的 js 文件的完整路径 
  >
  > 两者都是本地变量，使用时不用加载

  使用路径拼接的时候我们可以使用node提供的一个**path模块**，他可以更智能的识别反斜杠的存在和操作系统的兼容性，是我们的程序更简洁，兼容性更好

- node 错误优先规则，在node回调中，一般都是用err当做第一个回调参数

- try-catch 只能捕获 同步中的错误，异步中的错误无法用 trycatch来捕获，对于异步操作，要通过判断错误号（err.code）来进行出错处理

- 在请求服务器的时候，请求的url就只是一个标识，无其他作用

- require 模块加载是同步的

- 当加载一个模块的时候，被加载模块的代码在第一次加载的时候会执行一遍，并缓存起来，后续加载的话就不会执行代码

- node.js 遵循了 CommonJS 语法规范

- 在node中，没有全局作用域，只有模块作用域，外部访问不到内部，内部也访问不到外部