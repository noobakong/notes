# Iterator和for...of

## 什么是Iterator

ES6中的Map 和 Set ，再加上之前的数组和对象，这样就有了四种数据集合，用户可以组合使用它们，定义自己的数据结构。这时，我们就需要一个统一的机制，来处理这几种不同的和数据结构。

Iterator 遍历器就是这样一种机制，它是一种接口，为各种不同的数据结构提供统一的访问机制。

其作用有下：

1. 为各种数据结构提供统一简便的访问接口
2. 使得数据结构成员能够按照某种次序排列
3. 为es6中新的遍历方法 for...of 服务



## Iterator的遍历过程

- 创建一个指针对象，指向当前数据结构的起始位置。

  > 遍历器的本质，就是一个指针对象

- 第一次调用指针对象的`next`方法，可以将指针指向数据结构的第一个成员

- 第二次调用指针对象的`next`方法，指针就指向数据结构的第二个成员

- 如上不停的调用`next` 方法，直到它指向数据结构的结束位置 

  *学到这里突然想到了链表，哈哈哈 ~ ~*

**每一次调用`next`方法，都会返回数据结构的当前成员的信息**。具体来说，就是返回一个包含`value`和`done`两个属性的对象。其中，`value`属性是当前成员的值，`done`属性是一个布尔值，表示遍历是否结束。

## 手写一个 Iterator接口

```javascript
 const arr = [1, 2, 3]
    function iterator(arr) {
      let index = 0
      return {
        next: function () {
          return index < arr.length ? 
          {
            value: arr[index++], 
            done: false
          } : 
          {
            value: undefined,
            done: true
          }
        }
      }
    }
    const it = iterator(arr)
    console.log(it.next())
    console.log(it.next())
    console.log(it.next())
    console.log(it.next())
```

执行结果如下图：

![iterator](https://blog-1257919906.cos.ap-guangzhou.myqcloud.com/image/notes/es6/iterator1.png)

## Symbol.iterator属性

> 凡是具有Symbol.iterator属性的数据结构都自带具有Iterator 接口

**原生具备 Iterator 接口的数据结构如下：**

- Array
- Map
- Set
- String
- TypedArray
- 函数的 arguments 对象
- NodeList 对象

拿数组为例：

```javascript
let arr = ['a', 'b', 'c'];
let iter = arr[Symbol.iterator]();

iter.next() // { value: 'a', done: false }
iter.next() // { value: 'b', done: false }
iter.next() // { value: 'c', done: false }
iter.next() // { value: undefined, done: true }
```

![iterator](https://blog-1257919906.cos.ap-guangzhou.myqcloud.com/image/notes/es6/iterator1.png)

## 给对象添加Symbol.iterator属性

**另外一些数据结构没有（比如对象）**:

使用for of作用于对象时：

// Uncaught TypeError: obj is not iterable

```javascript
const obj = {}
console.log(obj[Symbol.iterator]) // undefined
```

凡是具有Symbol.iterator属性的数据结构都可以被for...of 循环调用，我们可以手动的给对象添加`Symbol.iterator` 属性

> 一个对象如果要具备可被`for...of`循环调用的 Iterator 接口，就必须在`Symbol.iterator`的属性上部署遍历器生成方法（原型链上的对象具有该方法也可）。

下面是通过遍历器实现指针结构的例子:

```javascript
function Obj(value) {
    this.value = value
    this.next = null
}

Obj.prototype[Symbol.iterator] = function() {
    var iterator = {next: next}
    var current = this

    function next() {
        if (current) {
            var value = current.value
            current = current.next
            return {
                value: value,
                done: false
            }
        } else {
            return {done: true}
        }
    }
    return iterator
}
var one = new Obj(1);
var two = new Obj(2);
var three = new Obj(3);

one.next = two;
two.next = three;

for (var i of one) {
    console.log(i); // 1, 2, 3
}
```

**简单一点，我们可以这样实现：**

```javascript
var obj = {
    a: 1,
    b: 2,
    'me': 'akong',
    'lover': 'xwr'
}

obj[Symbol.iterator] = function () {
    let keys = Object.keys(obj)
    let len = keys.length
    let n = 0

    return {
        next: function() {
            if (n < len) {
                return {
                    value: keys[n++],
                    done: false
                }
            } else {
                return {
                    done: true
                }
            }
        }
    }
}

for (var attr of obj) {
    console.log(attr)
}
```

这样我们就可以遍历obj对象啦~！

## 调用 Iterator 接口的场合

**（1）解构赋值**

对数组和 Set 结构进行解构赋值时，会默认调用`Symbol.iterator`方法。

``` javascript
let set = new Set().add('a').add('b').add('c');

let [x,y] = set;
// x='a'; y='b'

let [first, ...rest] = set;
// first='a'; rest=['b','c'];
```

**（2）扩展运算符**

扩展运算符（...）也会调用默认的 Iterator 接口。

```javascript
// 例一
var str = 'hello';
[...str] //  ['h','e','l','l','o']

// 例二
let arr = ['b', 'c'];
['a', ...arr, 'd']
// ['a', 'b', 'c', 'd']
```

**（3）其他场合**

由于数组的遍历会调用遍历器接口，所以任何接受数组作为参数的场合，其实都调用了遍历器接口。下面是一些例子。

- for...of
- Array.from()
- Map(), Set(), WeakMap(), WeakSet()（比如`new Map([['a',1],['b',2]])`）
- Promise.all()
- Promise.race()
- yield*