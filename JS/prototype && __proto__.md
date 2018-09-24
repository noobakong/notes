## 谈谈对`prototype`和`__proto__`的理解

> 之前初学JavaScript的时候，被这两个东西搞得迷迷糊糊的，前两天看JS高程的时候，看到了prototype，自己好好的总结了一下

### 1. 构造函数，原型对象，实例

构造函数的原型属性 `prototype`指向了原型对象，在原型对象有的属性和方法，构造函数构造出的实例都可以继承共享，不是很恰当的说，如果构造函数是实例的爹，那么原型对象就是构造函数的爹，也就是实例爹的爹，爷爷。

> 构造函数是函数
>
> 原型对象的对象
>
> 实例也是是对象

以下列代码为例：

```javascript
function Foo () {}
foo = new Foo ()
```

上面代码创造了一个构造函数，并new了一个Foo的实例foo，我们可以在控制台打印下面代码

![1536647396354](http://pd92xwp9t.bkt.clouddn.com/image/notes/js-%E5%8E%9F%E5%9E%8B2.png)

可以很明显看到，Foo构造函数是一个function，而foo实例和Foo.prototype原型对象都是对象

###  2. 关系示意图

![](http://pd92xwp9t.bkt.clouddn.com/image/notes/js-%E5%8E%9F%E5%9E%8B1.jpg)





###  3. 详解

> prototype 是属于一个函数特有的属性，而 `__proto__`一般存在于对象之中

- Foo函数作为一个构造函数，它的的prototype指向它的原型，Foo.prototype是一个对象，里面的属性和方法能传给Foo构造的实例之中。

- 而Foo.prototype这的对象有一个属性 为 **`constructor`** （构造器属性），constructor属性指向原型对象对应的构造函数，也就是指向 Foo  `foo.constructor --> ƒ Foo() {}`

- 对象具有`__proto__` 可称为隐式原型，一个对象的隐式原型，指向**构造改对象(foo)的构造函数(Foo)的原型(Foo.prototype)**，这也保证了实例能够访问继承构造函数原型对象中的属性和方法

  所以，`foo.__porto__ === Foo.prototype`

- 对象没有prototype属性，所以 `foo.prototype = undefined`

- 但是函数可以有`__proto__`属性，因为函数的本质也是一个对象

  Foo是一个方法，既一个函数，函数本身也是一个特殊的对象，把Foo作为一个对象来看，它的`__proto__`指向Foo构造函数本身的构造函数的原型，Foo构造函数的构造函数是是`Function `  

   `Foo.constructor -->  ƒ Function() { [native code] }`   (后者即是Function)

  `Foo.constructor  === Function`  // true

  `Foo.constructor.prototype === Foo.__proto__`   // true

  `Function.prototype === Foo.__proto__`   // true

- 原型对象是对象，也有`__proto__`属性，我们可以在控制台打印 `Foo.prototype.__proto__`发现出现了一个对象，里面有很多属性 包括 constructor， hasOwnProperty， isPrototypeOf，等等的方法

  其实这个对象就是Object.prototype， 而Object就是这个原型对象的构造函数

  > 这里的Object是一个构造函数，不是一个对象，不要搞错，typeof(Object) --> function

- 最后我们看一下Object.prototype这个对象的`__proto__`属性，我们会发现为Null

  `Object.prototype.__proto__`  //  null

- `Function.prototype === Function.__proto__` // true

  Function的原型和Function的`__proto__`竟然全等，构造Function的构造函数的原型 等于 Function的原型

  我们发现一个有趣的东西   `Function` 是由 `Function` 构造的 ，Function可以看成是调用其自身的new操作的实例化的结果，哈哈 有点意思，没爹，自己把自己搞出来了。。

  我们接着试探，发现`Function.prototype`当做一个对象来看，他的构造函数是Object( )函数，那么`Function.prototype.__proto`也就是Object的原型了 

   所以 `Function.prototype.__proto__ ===Object.prototype `  // true

### 4. 总结

- 对象有属性__proto__,指向该对象的构造函数的原型对象
- 方法除了有属性__proto__,还有属性prototype，prototype指向该方法的原型对象
- 函数(Function也是函数)是new Function的结果，所以函数可以作为实例对象，其构造函数是Function()，原型对象是Function.prototype
- 对象(函数也是对象)是new Object的结果，所以对象可以作为实例对象，其构造函数是Object()，原型对象是Object.prototype
- Object.prototype的原型对象是null