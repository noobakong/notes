## 手写Promise

之前的博客有提到Promise的介绍和使用，今天来试着实现以下Promise

### 来个简单版

Promise里有个状态 分别为 `pending` `resolved` `rejected`

#### 先来一个大体框架

```js
  <script>
    const PENDING = 'pending'
    const RESOLVED = 'resolved'
    const REJECTED = 'rejected'

    function MyPromise (fn) {
      // 保存this，避免后续混乱
      const that = this
      // 刚开始的Promise状态为PENDING
      that.state = PENDING
      // 使用value保存resove或者reject传入的值
      that.value = null
      // 保存resove和reject的回调
      that.resolvedcb = []
      that.rejectedcb = []
    }
  </script>
```

#### 完善resove和reject

完善resove和reject函数 添加到MyPromise函数体内部

```js
function resolve (value) {
    // Promise规范 只有等待状态下能改变状态
    if(that.state === PENDING) {
        that.state = RESOLVED
        that.value = value
        that.resolvedcbs.map(cb => cb(that.value))
    }
}
function resolve(value) {
    if (that.state === PENDING) {
        that.state === REJECTED
        that.value === value
        that.rejectedcbs.map(cb => cb(that.value))
    }
}
```

#### 编写fn执行

传参为resolve和reject函数参数

```js
    function MyPromise (fn) {
      // 保存this，避免后续混乱
      const that = this
      // 刚开始的Promise状态为PENDING
      that.state = PENDING
      // 使用value保存resove或者reject的函数参数
      that.value = null
      // 保存resove和reject的回调
      that.resolvedcbs = []
      that.rejectedcbs = []

      function resolve (value) {
        // Promise规范 只有等待状态下能改变状态
        if(that.state === PENDING) {
          that.state = RESOLVED
          that.value = value
          that.resolvedcbs.map(cb => cb(that.value))
        }
      }
      function reject(value) {
        if (that.state === PENDING) {
          that.state = REJECTED
          that.value = value
          that.rejectedcbs.map(cb => cb(that.value))
        }
      }
      
      try {
        fn(resolve,reject)
      } catch (e) {
        that.reject(e)
      }
    }
```

#### 编写then函数

```js
    // 编写then函数
    MyPromise.prototype.then = function(onResoleved, onRejected) {
      const self = this
      // 判断这两个参数是不是函数类型，因为这两个是可选参数
      // 如果不是函数类型，则需要创建一个函数复制给对应的参数，同时实现了传递
      onResoleved = typeof onResoleved === 'function' ? onResoleved : v=>v
      onRejected = typeof onRejected === 'function' ? onRejected : r=> {throw r}
      if (this.state === PENDING) {
        self.resolvedCallBacks.push(onResoleved)
        self.rejectedCallBacks.push(onRejected)
      }
      if (this.state === RESOLVED) {
        onResoleved(self.value)
      }
      if (this.state === REJECTED) {
        onRejected(self.value)
      }
    
```

