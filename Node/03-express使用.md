## Express

> express 是 node 中最流行的框架之一。

### 1. 起步

安装：

```shell
npm install express --save
```

hello world

```javascript
const express = require('express')

// 创建服务器
const app = express()

// 当服务区 收到get 请求 '/' 时， 指向回调处理函数
app.get('/', function (req, res) {
  res.send('hello world')
})

app.get('/about', function (req, res) {
  console.log(req.query)
  res.send('hello about me~')
})

// 在 express 中 开放资源 就是一个 api 的事
app.use('/static/', express.static('./static/'))
// http://localhost:3000/static/loading.gif 即可访问图片

// 建立监听端口 相当于 server.listen
app.listen(3000, function () {
  console.log('app is running at http://localhost:3000')
})
```

### 2. 基本路由

get：

```javascript
app.get('/', function (req, res) {
  res.send('hello world')
})
```

post:

```
app.post('/', function (req, res) {
  res.send('get a post request')
})
```

### 3. 静态服务

```javascript
// 直接就能访问public目录下的资源
app.use(express.static('public'))

// public/xxx
app.use('/public/', express.static('./public/'))

// static/xxx
app.use('/static/', express.static('./static/'))
```

### 4. 在express中使用 `art-template`模板引擎

安装

```shell
npm install --save art-template
npm install --save express-art-template
```

配置：

```javascript
app.engine('html', require('express-art-template')) // 最核心的代码
```

> 配置使用 art-template渲染模板引擎
>
> 第一个参数表示，当渲染以 .html结尾的文件时 使用渲染模板，可以更改为其他的后缀

使用：

```javascript
app.get('/', function (req, res) {
  res.render('index.html', {
    title: '.....'   // 渲染属性
  })
})
```





express 为 response 响应对象提供了一个 render 方法

这个render方法默认不可以使用，只有像上面**配置了模板引擎后才可以使用这个方法**

res.render('html模板名', {模板数据})

上面的第一个参数不能写路径，express默认去 项目的 views 目录中寻找该模板文件

也就是说 express 有一个约定，开发人员最好把视图文件都放在 views 文件目录中

*如果想要修改默认的 views 目录， 可以 app.set('views', render函数的默认路径)来更改*



### 5. 在express中获取 表单 get 请求体数据

```javascript
req.query
```

> express 内置了一个 API， 可以直接 通过 req.query 来获取

### 6. 在express中获取 表单 post 请求体数据

> Express middleware 中间件 给我们提供了很多常用的插件，其中就有处理 post 请求体的插件`body-parser`

安装：

```shell
npm install body-parser
```

配置：

```javascript
var express = require('express')
var bodyParser = require('body-parser')
var app = express()

// 配置 bodyParser 只要加入这个配置，则在 req 请求对象上 会多出一个属性body
// 也就是说你可以直接通过 req.body 来获取表单 post 请求体数据了
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(function (req, res) {
  res.setHeader('Content-Type', 'text/plain')
  res.write('you posted:\n')
  // 通过 req.body 获取数据
  res.end(JSON.stringify(req.body, null, 2))
})
```

### 7. 在express中 使用 express-session

安装：

```shell
npm i express-session

# 引用
var session = require('express-session')
```

配置：

```javascript
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
  // cookie: { secure: true }
}))
```
- secret： 配置加密字符串，会在原有加密基础上和这个字符串拼接起来去加密，增加安全性，防止客户端恶意伪造
- saveUninitialized： 默认为 true 即无论是否使用 session 都会默认分给你一把钥匙


使用：

```javascript
// 添加 session 数据
req.session.foo = 'bar'

// 获取 session 数据
req.session.foo
```

> secret: 该插件会为 req  请求对象添加一个成员 req.session，默认是一个对象，session数据内存存储的，服务器一旦重启就会丢失，真正的生产环境会把 session 进行持久化存储。




### 8. 修改完代码自动重启服务

> 我们可以使用一个第三方工具 `nodemon` 来帮助我们解决频繁修改服务端代码重启服务器的问题

`nodemon`是一个基于node.js开发的第三方命令，我们一般使用时可全局安装

```shell
npm install nodemon --global
```

安装完毕后，使用命令

```shell
nodemon app.js（要执行的文件）
```

通过 `nodemon`启动后的服务，会被实时监控，只要文件发生改变，就会自动帮你重启服务器。



### 9. 用express 来重写上次的 原生node留言版

```javascript
var express = require('express')
var app = express()

// 配置使用 art-template渲染模板引擎
// 第一个参数表示，当渲染以 .html 结尾的文件时 使用渲染模板，可以更改
app.engine('html', require('express-art-template'))

app.use('/public/', express.static('public'))

var comments = [
  {
    name: '阿孔',
    message: 'Yo~~',
    dataTime: '2018-09-27'
  },
  {
    name: '老许',
    message: 'Yo~@@@~',
    dataTime: '2018-09-27'
  }
]
// express 为 response 响应对象提供了一个 render 方法
// 这个render方法默认不可以使用，只有像上面配置了模板引擎后才可以使用这个方法
// res.render('html模板名', {模板数据})
//  上面的第一个参数不能写路径，express默认去 项目的 views 目录中寻找该模板文件
//  也就是说 express 有一个约定，开发人员最好把视图文件都放在 views 文件目录中
//  如果想要修改默认的 views 目录， 可以 app.set('views', render函数的默认路径)来更改
app.get('/', function (req, res) {
  res.render('index.html', {
    comments
  })
})

app.get('/post', function (req, res) {
  res.render('post.html')
})

app.get('/pinglun', function (req, res) {
  var comment = req.query // req.query 只能拿get请求参数
  comment.dataTime = '2018-10-01'
  comments.unshift(comment)
  res.redirect('/')
  // res.statusCode = 302
  // res.setHeader('Location', '/')
  // express 封装的 res.send 和 res.redirect 等方法都会自动结束响应
})

app.listen(3000, function () {
  console.log('http://localhost:3000')
})
```

express 封装了很多方法，res.render,  res.redirect, req.query 等，打打减少了代码量。

这里知识简单的尝试一下express，继续学习。