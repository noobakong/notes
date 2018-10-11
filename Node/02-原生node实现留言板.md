## 原生node实现简易留言板

> 学习node，实现一个简单的留言板小demo

![预览](http://pd92xwp9t.bkt.clouddn.com/image/notes/node-liuyanban.gif)



### 1. 使用模块

- http模块

  创建服务

- fs模块

  操作读取文件

- url模块

  便于path操作并读取表单提交数据

- art-template模块（需npm安装）

  服务端渲染

### 2. 服务端

#### 2.1 服务端代码

```javascript
var http = require('http')
var fs = require('fs')
var url = require('url')
var template = require('art-template')

var comments = [
  {
    name:'阿孔',
    message: 'Yo~~',
    dataTime: '2018-09-27'
  },
  {
    name: '老许',
    message: 'Yo~@@@~',
    dataTime: '2018-09-27'
  }
]
http.createServer(function (req, res) {
  var parseObj = url.parse(req.url, true)

  var pathname = parseObj.pathname

  if (pathname === '/') {
    fs.readFile('./views/留言本.html', function (err, data) {
      if (err) {
        return res.end('404 Not Found')
      }
      var htmlStr = template.render(data.toString(), {
        comments: comments
      })
      res.end(htmlStr)
    })
  } else if (pathname.indexOf('/public/') === 0) {
    fs.readFile('.' + pathname, function (err, data) {
      if (err) {
        return res.end('404 Not Found')
      }
      res.end(data)
    })
  } else if (pathname === '/post') {
    fs.readFile('./views/post.html', function (err, data) {
      if (err) {
        return res.end('404 Not Found')
      }
      res.end(data)
    })
  } else if (pathname === '/pinglun') {
    // 追加到数组
    var comment = parseObj.query
    comment.dataTime = '2018-10-01'
    comments.unshift(comment)
    // 跳转首页
    // 如何通过服务器让客户端重定向
    //  1. 状态码设置为 302 临时重定向 statusCode
    //  2. 在响应头中通过 location 告诉客户端去哪重定向
    res.statusCode = 302
    res.setHeader('Location', '/')
    res.end()
  } else {
    fs.readFile('./views/404.html', function(err, data) {
      res.end(data)
    })
  }

}).listen(3000, function () {
  console.log('http://localhost:3000')
})
```

#### 2.2 页面渲染

> 使用了 第三方 的渲染模板工具 `art-template`,在请求 / 主页时，在服务端将页面中的数据渲染出来 数据来自comments数组

```javascript
  if (pathname === '/') {
    fs.readFile('./views/留言本.html', function (err, data) {
      if (err) {
        return res.end('404 Not Found')
      }
      var htmlStr = template.render(data.toString(), {
        comments: comments
      })
      res.end(htmlStr)
    })
  }
```

#### 2.3 评论提交

> 评论提交的实现，在post提交页面中 form表单的行为action指定 `/pinglun`，随后在服务端的app.js中处理 `/pinglun`路径请求逻辑

```javascript
else if (pathname === '/pinglun') {
    // 追加到数组
    var comment = parseObj.query
    comment.dataTime = '2018-10-01'
    comments.unshift(comment)
    // 跳转首页
    // 如何通过服务器让客户端重定向
    //  1. 状态码设置为 302 临时重定向 statusCode
    //  2. 在响应头中通过 location 告诉客户端去哪重定向
    res.statusCode = 302
    res.setHeader('Location', '/')
    res.end()
  } 
```

其中，有几点需要注意

1. parseObj

   parseObj是通过url模块解析每次请求的路径得到的

   `var parseObj = url.parse(req.url, true)`

   url中的parse方法可以将url解析为一段一段的数据

   例如，我们在 node 中 执行下面代码

   ```javascript
   var parseObj = url.parse('http://localhost:3000/pinglun?name=aaa&message=bbbbbbb', true)
   console.log(parseObj)

   Url {
     protocol: 'http:',
     slashes: true,
     auth: null,
     host: 'localhost:3000',
     port: '3000',
     hostname: 'localhost',
     hash: null,
     search: '?name=aaa&message=bbbbbbb',
     query: { name: 'aaa', message: 'bbbbbbb' },
     pathname: '/pinglun',
     path: '/pinglun?name=aaa&message=bbbbbbb',
     href: 'http://localhost:3000/pinglun?name=aaa&message=bbbbbbb' }
   ```

   可以看到，url的方法直接将url解析成一个对象，里面包含着很多我们能方便使用的属性，入其中的**query**，这里面就包含着我们提交的数据信息，url.parse方法的第二个参数默认为 false ，若默认false的话，query就不是一个对象，而是一个字符串，设置为true后就会自动帮我们解析成一个对象，方便我们使用。

   我们评论的追加就是取得这个parseObj.query对象中的数据

   ```javascript
       var comment = parseObj.query
       comment.dataTime = '2018-10-01'
       comments.unshift(comment)
   ```

   最后在使用unshift数组方法追加到最前面，这样我们的评论功能就能实现了。

#### 2.4 服务端重定向

> 我们在追加我们的评论后，需要跳转到我们的 / 主页，这是我们的 comments已经追加新数据， 在渲染的时候，自然就能将我们的新数据展现到我们的页面中。

关于重定向，此次有两部操作

```javascript
    res.statusCode = 302
    res.setHeader('Location', '/')
```

第一步设置res请求的状态码，状态302 是临时重定向的状态码，

而后我们设置响应头的Location设置为 主页

> **访问别的页面：**response.setStatus（302）; response.setHeader("location","url");

#### 2.5 代码杂点笔记

- 模块加载在node中是同步的，通常把当前模块所有的依赖项都声明再文件模块最上面

- 为了让目录结构保持统一清晰，所以我们约定，把所有的 HTML 文件都放到 views（视图） 目录中，把所有的静态资源都存放在 public 目录中

  ​    浏览器收到 HTML 响应内容之后，就要开始从上到下依次解析，

  ​    当在解析的过程中，如果发现：

  - link
  - script
  - img
  - iframe
  - video
  - audio

  ​    等带有 src 或者 href（link） 属性标签（具有外链的资源）的时候，浏览器会自动对这些资源发起新的请求。

- 在这中服务端中，请求文件路径不要再去写相对路径了，因为这个时候所有的资源都是通过url来获取的，我们服务器开放了/public/目录，这里的静态资源的请求，如bootstrap.css都写为:

  `<link rel="stylesheet" href="/public/lib/bootstrap/dist/css/bootstrap.css">`

  浏览器在真正发请求的时候会最终把http://localhost:3000 拼在前面

### 3. 客户端

#### 3.1 客户端代码

```html
<body>
  <div class="header container">
    <div class="page-header">
      <h1>留言板  <small>--- a small demo of node</small></h1>
      <a class="btn btn-success" href="/post">发表留言</a>
      <hr>
    </div>
  </div>
  <div class="comments container">
    <ul class="list-group">
      {{each comments}}
        <li class="list-group-item">{{$value.name}}说: {{$value.message}}<span class="float-right">{{$value.dataTime}}</span></li>
      {{/each}}
    </ul>
  </div>
</body>
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <link rel="stylesheet" href="/public/lib/bootstrap/dist/css/bootstrap.css">
</head>

<body>
  <div class="header container">
    <div class="page-header">
      <h1><a href="/">首页</a> <small>发表评论</small></h1>
    </div>
  </div>
  <div class="comments container">
    <!-- 
      以前表单是如何提交的？
      表单中需要提交的表单控件元素必须具有 name 属性
      表单提交分为：
        1. 默认的提交行为
        2. 表单异步提交

        action 就是表单提交的地址，说白了就是请求的 url 地址
        method 请求方法
            get
            post
     -->
    <form action="/pinglun" method="get">
      <div class="form-group">
        <label for="input_name">你的大名</label>
        <input type="text" class="form-control" required minlength="2" maxlength="10" id="input_name" name="name" placeholder="请写入你的姓名">
      </div>
      <div class="form-group">
        <label for="textarea_message">留言内容</label>
        <textarea class="form-control" name="message" id="textarea_message" cols="30" rows="10" required minlength="5" maxlength="20"></textarea>
      </div>
      <button type="submit" class="btn btn-default">发表</button>
    </form>
  </div>
</body>

</html>

```

所有的代码都在github仓库[github代码](https://github.com/noobakong/notes/tree/master/Node/%E5%8E%9F%E7%94%9Fnode%E5%AE%9E%E7%8E%B0%E7%AE%80%E6%98%93%E7%95%99%E8%A8%80%E6%9D%BF)



