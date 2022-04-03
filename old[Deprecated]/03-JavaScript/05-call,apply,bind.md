# call apply bind

## 含义

> 摘自MDN

### `call`语法

- `fun.call(thisArg, arg1, arg2, ...)`
- `thisArg`: 在fun函数运行时指定的this值。需要注意的是，指定的this值并不一定是该函数执行时真正的this值，如果这个函数处于非严格模式下，则指定为null和undefined的this值会自动指向全局对象(浏览器中就是window对象)，同时值为原始值(数字，字符串，布尔值)的this会指向该原始值的自动包装对象。
- `arg1, arg2, ...` 指定的参数列表

### `apply`语法

- `fun.apply(thisArg, [argsArray])`
- `thisArg` 在 fun 函数运行时指定的 this 值。需要注意的是，指定的 this 值并不一定是该函数执行时真正的 this 值，如果这个函数处于非严格模式下，则指定为 null 或 undefined 时会自动指向全局对象（浏览器中就是window对象），同时值为原始值（数字，字符串，布尔值）的 this 会指向该原始值的自动包装对象。
- `argsArray` 一个数组或者类数组对象，其中的数组元素将作为单独的参数传给 fun 函数。如果该参数的值为null 或 undefined，则表示不需要传入任何参数。从ECMAScript 5 开始可以使用类数组对象。

### `bind`语法

- `fun.bind(thisArg[, arg1[, arg2[, ...]]])`
- `thisArg` 当绑定函数被调用时，该参数会作为原函数运行时的 this 指向。当使用new 操作符调用绑定函数时，该参数无效。
- `arg1, arg2, ...` 当绑定函数被调用时，这些参数将置于实参之前传递给被绑定的方法。

## 异同

### call和apply

`call` `apply` `bind`都可以改变函数调用的`this`指向

我们先来说call和apply，上面的官方文档可以看得，两个方法唯一的不同就是传参的不同，call传参是一个一个的传，而apply传参是直接一个数组

**先举一个简单的例子**

```js
    const akong =  {
      name: '阿孔',
      say: function () {
        console.log(this.name)
      }
    }
    const xwr = {
        name: '许文瑞',
        say: function () {
          console.log(this.name)
        }
    }
```

akong调用say方法，说做出自己的名字`阿孔`

xwr调用say方法，说做出自己的名字`许文瑞`

这是如果有个需求，让阿孔说自己的名字是许文瑞，这个时候就可以使用call或者apply来实现

```javascript
akong.say.call(xwr)
akong.say.apply(xwr)
// 许文瑞

// 这里没有传参，所以call和apply的效果一样
```

**回想一下实现继承的一种方法就是使用构造函数**

实现继承的一种方式是使用构造函数，其中就使用了call/apply原理

``` js
    function Person (name,age) {
      this.name = name,
      this.age = age,
      this.say = function () {
        console.log(name)
      }
    }
    function otherP (name,age,money) {
       Person.call(this,name,age)
      //Person.apply(this,[name,age])
      this.money = money
    }
    var a = new Person('akong',23)
    var b = new otherP('xwr',22,'没钱')
    
```

**总结**

> `call`跟`apply`的用法几乎一样，唯一的不同就是传递的参数不同，`call`只能一个参数一个参数的传入。
> `apply`则只支持传入一个数组，哪怕是一个参数也要是数组形式。最终调用函数时候这个数组会拆成一个个参数分别传入。

### bind

> 那么bind和call,apply完成的工作一样，但是bind只是将函数的指向改变，没有执行，而其他的两个是改变后立刻执行了

上述的例子1中，我们可以把 `阿孔说自己的名字是许文瑞`这个方法使用bind，赋值给一个函数变量，这样以后就可以根据我们的需要来调用

```javascript
    const akong =  {
      name: '阿孔',
      say: function () {
        console.log(this.name)
      }
    }
    const xwr = {
        name: '许文瑞',
        say: function () {
          console.log(this.name)
        }
    }
    const lying = akong.say.bind(xwr)
    laying()
	// 许文瑞
```



## 手写call apply bind

运行机制我们都已经了解了，我们来手动手写一下这三个东西，哈哈

### call

> mdn说的很清楚，如果这个函数处于非严格模式下，则指定为null和undefined的this值会自动指向全局对象(浏览器中就是window对象)。

实现原理就是：

将执行函数绑定到目标对象的一个方法属性上，返回 执行这个方法的结果

**代码：**

```js
// 实现call
Function.prototype.myCall = function (context) {
  //context为需要被绑定上的对象，arguments是参数
  if (typeof context === 'undefined' || context === null) {
    context = window
  }
  // this指向的就是调用myCall的函数
  // 这里将函数挂在到绑定对象的一个属性方法上
  context.fn = this
  let args = [...arguments].slice(1)
  // 执行这个方法
  let result = context.fn(...args)
  delete context.fn
  return result
}
```

### apply

> apply和call一样，不过是把参数改为数组就ok了

```js
// apply
Function.prototype.myApply = function (context) {
    if (typeof context === 'undefined' || context === null) {
        context = window
    }
    context.fn = this
    let args = arguments[1]
    let result
    if (args) {
        result = context.fn(...args)
    } else {
        result = context.fn()
    }
    delete context.fn
    return result
}
```

### bind

> 注意：bind返回的函数可以作为构造函数使用。故作为构造函数时应使得this失效，但是传入的参数依然有效

```javascript
    Function.prototype.myBind = function (thisArg) {
        if (typeof this !== 'function') {
          throw new Error("error")
        }
        var _self = this
        var args = [...arguments].slice(1)
        var fnNop = function () { } // 定义一个空函数
        var fnBound = function () {
          // 判断是否可以当做构造函数使用
          var _this = this instanceof _self ? this : thisArg

          return _self.apply(_this, args.concat([...arguments]))
        }
        // 维护原型关系
        // 将空对象的原型指向调用函数的原型
        fnNop.prototype = this.prototype;
        // 然后又将fnBound的原型指向一个新的FNOP实例
        // 这个步骤完成了给fnBound拷贝一个FNOP的prototype即this/foo的prototype。
        // 其实这几句就相当于fBound.prototype = Object.create(this.prototype); 
        fnBound.prototype = new fnNop();
        return fnBound;
      }
```

bind这里很绕，牵扯到很多原型链和作用域的问题，详细可以参考一篇博文 [JavaScript深入之bind的模拟实现](https://github.com/mqyqingfeng/Blog/issues/12)

## 黑魔法

### 数组和Math结合

```js
const arr = [1,2,3,4,5,6]
const max = Math.max.apply(null, arr)
console.log(max)    // 6
```

我们都知道Math里面有很多好用的方法比如max和min，apply传参要求后面的参数是一个数组，我们可以使用这一个特性，将两者巧妙的结合，就实现了上述的简单取最值的效果。

