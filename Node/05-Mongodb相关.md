## mongodb

> MongoDB 是一个介于关系数据库和非关系数据库之间的产品，是非关系数据库当中功能最丰富，最像关系数据库的。

### 1. 安装相关
#### 1.1 下载

 官网下载地址 ：[官网下载社区版](https://www.mongodb.com/download-center/v2/community)

#### 1.2 安装及环境配置

- 安装

  > 下载的是 zip 解压到想要的路径即可

- 配置

  我的电脑 --> 属性 --> 高级系统设置 --> 环境变量 --> 编辑用户变量的 path --> 添加解压mongondb路径下的bin目录即可

#### 1.3 检测

> 在cmd控制台输入 `mongod --version` 出现版本信息及安装成功



### 2. 使用相关

#### 2.1 开启和关闭数据库

- **启动**

  ```shell
  # mongodb 默认使用执行 mongod 命令，会调用当前目录盘符根目录下的 /data/db 文件夹作为数据存储目录
  # 所以如果第一次在新的盘符下执行mongod前应手动创建一个 /data/db 目录
  mongod
  ```

  > 在执行路径根目录下没有 data/db 目录会导致报错 启动失败

  如果想自定义数据存储目录，可以

  ```shell
  mongod --dbpath=你想要的存储的路径
  ```

- **停止**

  Ctrl + C 或者直接关闭控制台即可

#### 2.2 连接、退出数据库

- **连接**

  > 在开启的前提下，再开一个cmd控制台窗口

  执行：

  ```shell
  # 该命令默认连接本机的 MongoDB服务
  mongo
  ```
  **注意**：连接数据库也要保证目录下的data/db 目录存在，否则的话可能会导致连不上

- **退出**

  > 退出数据库不是关闭数据库

  ```shell
  # 在连接的状态窗口下输入 exit 接口退出
  exit
  ```

#### 2.3 基本命令

- `show dbs `

  *查看显示所有数据库*

  ```shell
  > show dbs
  admin   0.000GB
  config  0.000GB
  local   0.000GB
  ```

  上面三个数据库是系统数据库，我们最好不要操作他们

- `db`

  *查看当前操作的数据库*

- `use 数据库名称`
  *切换到指定的数据库，如果没有，则新建*

- 。。。

> 开发过程中一般不使用黑窗口cmd来操作数据库

### 3. 在node中使用MongoDB

#### 3.1 使用官方的 mongodb 包来操作

> [官方mongodb包](https://github.com/mongodb/node-mongodb-native)

里面提供了很多数据库操作的API， 但是对于开发来说，还是相比较为底层，所以开发中也不常用

#### 3.2 使用第三方 mongoose 操作数据库

第三方包，基于MongoDB官方的 mongodb 包又进行了一次封装。

- [官网](https://mongoosejs.com/)
- [官网指南](https://mongoosejs.com/docs/guide.html)
- [官网API](https://mongoosejs.com/docs/api.html)


**安装**

```shell
npm install mongoose 
```

**hello world**

```javascript
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

const Cat = mongoose.model('Cat', { name: String });

const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then(() => console.log('meow'));
```

 ### 4. mongoose初次使用小demo

#### 4.1 起步 初始化

```javascript
var mongoose = require('mongoose')

// 数据库中的Schema，为数据库对象的集合
var Schema = mongoose.Schema

// 连接数据库
// 指定连接的数据库不需要存在，当你插入第一条数据的之后会自动创建出来
mongoose.connect('mongodb://localhost/mytest')

// 设计集合结构
// 约束数据的类型及其他的一些要求 避免脏数据
var userSchema = new Schema({
  username: {
    type: String,
    required: true // 必须有 不能为空
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String
  }
})

// 将文档结构发布为模型
//  mongoose.model 方法就是将一个架构发布为 model
// 第一个参数： 传入一个首字母大写名词单数字符串，表示数据库名称
//             mongoose 会自动将大写名词的字符串生成 小写复数 的集合名称
//             例如:这里的User 最终会编程 users 集合名称
// 第二个参数： 架构 Schema
// 返回值： 模型构造函数
// 有了这个模型构造函数之后，就可以对 这个集合中的数据 进行我们想要的操作了
var User = mongoose.model('User', userSchema)
```
#### 4.2 添加数据

`save()`

```javascript
...

var admin = new User({
  username: 'admin',
  password: '123456',
  email: 'admin@qq.com'
})

admin.save(function (err, ret) {
  if (err) {
    console.log('保存失败')
  } else {
    console.log('保存成功')
    console.log(ret)
  }
})
```

这里的输出：

```shell
保存成功
{ _id: 5bb87029fb8d521954db7d25,
  username: 'admin',
  password: '123456',
  email: 'admin@qq.com',
  __v: 0 }
```

#### 4.3 查询数据

- 查询所有

  ```javascript
  User.find(function(err, ret) {
    if (err) {
      console.log('error')
    } else {
      console.log(ret)
    }
  })
  ```

- 按条件查询

  ```javascript
  User.find({
    // 筛选条件
    username: 'zs' // 筛选出username 为 zs 的数据
  },function (err, ret) {
    if (err) {
      console.log('error')
    } else {
      console.log(ret)
    }
  })
  ```

- 查询一个 findOne

  ```javascript
  User.findOne({
    username: 'zs' // 筛选出username 为 zs 的数据
  }, function (err, ret) {
    if (err) {
      console.log('error')
    } else {
      console.log(ret)
    }
  })
  ```

  > 这里查找一个 返回的不再是一个数组，而是一个对象
  >
  > 找不到即返回 `null`
  >
  > 不加筛选条件就返回第一条数据

#### 4.4 删除数据

```javascript
User.remove({
  username: 'admin'
}, function (err) {
  if (err) {
    console.log('error')
  }
})
```

#### 4.5 更新数据

```javascript
User.findByIdAndUpdate('5bb87a44b70a9508346d35f9', {
  password: '123'
}, function (err) {
  if (err) {
    console.log('更新失败')
  } else {
    console.log('更新成供')
  }
})
```

以上的操作只是写简单的基本操作，更加复杂的操作情景可一查看[官网](https://mongoosejs.com/)api。