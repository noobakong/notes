## 回调

### js中的回调

> 我们来看下面的例子

假如有这样一个函数：

```javascript
function add(x, y) {
    var ret
    setTimeout(function () {
        ret = x + y
    }, 1000)
    return ret
}
console.log(add(10,20)) // undefined
```

我们可以看到，由于函数内部是 一个异步定时器，我们console.log的时候，加法函数还没有执行，所以结果肯定是`undefined`

> 那么，我们如何在函数外部拿到这个异步加法函数正确的返回值呢？

**想要获取异步函数的返回值，唯一有效的方法是通过回调函数来实现**

我们可以用下列代码获取异步返回值：

```javascript
function add(x, y, callback) {
    // callback 就是一个回调函数
    // var x = 10
    // var y = 20
    // var callback = function (ret) { console.log(ret) }
    var ret
    setTimeout(function () {
        ret = x + y
        callback(ret)
    }, 1000)
    return ret
}

add(10, 20, function (ret) {
    console.log(ret)
})
```

