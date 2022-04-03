# ES6中的 let 和const 

> 在es6之前，我们声明变量都是用 `var` ，es6新增了 `let`,和 `const`方法
>
> let：用来声明一个变量，和var非常相似
>
> const： 用来声明一个常量

## let

### 1. let声明的变量只当前代码快内有效

```javascript
{
    let a = 1
    var b = 2
}

console.log(a) // error
console.log(b) // 2
```

### 2. let声明的变量在预编译的时候不会被提升

**使用var**

```javascript
console.log(a) // 1
var a = 1 
```

**使用let**

```javascript
console.log(b) // error
let b = 2
```

使用let，在控制台内就会报错

### 3. let 不允许在同一作用域下重复声明

```javascript
let a = 1
let a = 2
// error
```

### 4. let 在 for 循环中的应用

```javascript
 var a=[];
    for(var i=0;i<10;i++){
        a[i]=function(){
            console.log(i);
        };
    }
 a[6](); //10    
```

上面的代码 ，我们本意是让`a[i]()`执行分别输出i的值，但是由于闭包的存在，使得最后都是打印的10

**我们可以使用常规的立即执行函数来解决闭包**

```javascript
var a = [];
for (var i = 0; i < 10; i++) {
    (function (i) {
        a[i] = function () {
            console.log(i);
        };
    })(i)
}
a[6](); //6
```



**我们可以使用let非常简单的来解决常见的闭包问题**

```javascript
 let a=[];
    for(let i=0;i<10;i++){
        a[i]=function(){
            console.log(i);
        };
    }
 a[6](); //6
```

## const

const命令同样具有let的特性，除了这些，还有一些注意点

### 1. 声明的时候必须赋值

```javascript
const a
// error Uncaught SyntaxError: Missing initializer in const declaration
```

### 2. 声明的常量不可变

**声明的基本类型值不可改变其值**

```javascript
const a = 1
a = 2 
// error Uncaught TypeError: Assignment to constant variable.
```

**如果是对象或者数组，引用不可更改，数据结构可以改变**

```javascript
const obj = {a:1}
obj.a = 2 // ok
obj.b = 'aaa' // ok
obj = {a: 2} // error
```

