# ES6知识点大纲

资料参考： [阮一峰ES6](http://es6.ruanyifeng.com/#docs/symbol), 致谢阮前辈！

## 1. Symbol

### 1.1 概述

> 保证每个属性的名字都是独一无二的就好了，这样就从根本上防止属性名的冲突。这就是 ES6 引入`Symbol`的原因

在es6之前，JavaScript数据类型分为 

Number、Boolean、String、Null、Undefined、Object

es6中，新增了一个基本数据类型 **Symbol**

> ES6 引入了一种新的原始数据类型`Symbol`，表示独一无二的值。它是 JavaScript 语言的第七种数据类型，前六种是：`undefined`、`null`、布尔值（Boolean）、字符串（String）、数值（Number）、对象（Object）。

**Symbol值是由Symbol函数调用产生的**

对象的属性名现在可以有两种类型，一种是原来就有的字符串，另一种就是新增的 Symbol 类型。凡是属性名属于 Symbol 类型，就都是独一无二的，可以保证不会与其他属性名产生冲突。

```javascript
let s = Symbol();

typeof s
// "symbol"
```

Symbol 函数不是构造函数，不能通过new 来构造一个Symbol实例，因为Symbol生成的是一个原始类型值，而不是对象。

`Symbol`函数可以接受一个字符串作为参数，表示对 Symbol 实例的描述，主要是为了在控制台显示，或者转为字符串时，比较容易区分。

```JavaScript
let s1 = Symbol('foo');
let s2 = Symbol('bar');

s1 // Symbol(foo)
s2 // Symbol(bar)

s1.toString() // "Symbol(foo)"
s2.toString() // "Symbol(bar)"
```

**每一个Symbol都是独一无二的**

```javascript
// 没有参数的情况
let s1 = Symbol();
let s2 = Symbol();

s1 === s2 // false

// 有参数的情况
let s1 = Symbol('foo');
let s2 = Symbol('foo');

s1 === s2 // false
```

**另外，Symbol 值也可以转为布尔值，Symbol 值不能与其他类型的值进行运算，会报错。**

### 1.2 作为属性名的Symbol

> 由于每一个 Symbol 值都是不相等的，这意味着 Symbol 值可以作为标识符，用于对象的属性名，就能保证不会出现同名的属性。这对于一个对象由多个模块构成的情况非常有用，能防止某一个键被不小心改写或覆盖。

```javascript
let mySymbol = Symbol();

// 第一种写法
let a = {};
a[mySymbol] = 'Hello!';

// 第二种写法
let a = {
  [mySymbol]: 'Hello!'
};

// 第三种写法
let a = {};
Object.defineProperty(a, mySymbol, { value: 'Hello!' });

// 以上写法都得到同样结果
a[mySymbol] // "Hello!"
```

**Symbol 值作为对象属性名时，不能用点运算符，使用 Symbol 值定义属性时，Symbol 值必须放在方括号之中。**

### 1.3 应用实例 

*属性私有化 - 数据保护*

**场景：**我们想创建一个构造函数Person，我们希望Person的性别在被创建后，就保存到死，无法改变。

这个时候我们就可以使用我们的Symbol作为Person属性名：

```javascript
var Person = (function() {
    let _gender = Symbol('gender');
    function P(name, gender) {
        this.name = name;
        this[_gender] = gender;
    }
    return P;
  })();

var p1 = new Person('阿孔', '男');
console.log(p1);
```

上述代码很简单，我们使用Symbol函数创建一个Symbol值作为我们构造函数Person的一个属性，性别。

![](https://blog-1257919906.cos.ap-guangzhou.myqcloud.com/image/notes/es6/Symbol1.png)



可以看到，我们的Symbol性别属性被添加到实例当中

此时如果我们想通过常规的方法来取我们的属性值，

```javascript
console.log(p1[Symbol('gender')])
```

**我们预期的可能是能取到 “男”，但是取到的是undefined**

这说明，我们此时的Symbol属性外部只能看，不能读，更不能改。大大的加强了属性的私有化属性。

**但是我们可以在构造函数内部来获取使用我们的值**

在构造函数内部，我们可以在原型链上添加一个say方法

```javascript
P.prototype.say = function() {
    console.log(this[_gender]);
}
...

  p1.say()
```

打开控制台，我们就可以看到 男 被打印了出来。



### 1.4  Symbol.for()，Symbol.keyFor()

**Symbol.for()**

`Symbol.for()`与`Symbol()`这两种写法，都会生成新的 Symbol。它们的区别是，前者会被登记在全局环境中供搜索，后者不会。`Symbol.for()`不会每次调用就返回一个新的 Symbol 类型的值，而是会先检查给定的`key`是否已经存在，如果不存在才会新建一个值。比如，如果你调用`Symbol.for("cat")`30 次，每次都会返回同一个 Symbol 值，但是调用`Symbol("cat")`30 次，会返回 30 个不同的 Symbol 值。

有时，我们希望重新使用同一个 Symbol 值，`Symbol.for`方法可以做到这一点。它接受一个字符串作为参数，然后搜索有没有以该参数作为名称的 Symbol 值。如果有，就返回这个 Symbol 值，否则就新建并返回一个以该字符串为名称的 Symbol 值。

**Symbol.keyFor()**

> `Symbol.keyFor`方法返回一个已登记的 Symbol 类型值的`key`。

```javascript
let s1 = Symbol.for("foo");
Symbol.keyFor(s1) // "foo"

let s2 = Symbol("foo");
Symbol.keyFor(s2) // undefined
```

上面代码中，变量`s2`属于未登记的 Symbol 值，所以返回`undefined`。

### 1.5 内置的 Symbol 值

> 除了定义自己使用的 Symbol 值以外，ES6 还提供了 11 个内置的 Symbol 值，指向语言内部使用的方法。

Symbol目前最常用的地方就是作为对象的私有属性去，更多更高级的内容可以访问 http://es6.ruanyifeng.com/#docs/symbol

