# generator,async

## generator

### 介绍

Generator 函数是 ES6 提供的一种异步编程解决方案，语法行为与传统函数完全不同。

一般的函数代码都是同步按顺序执行的

```javascript
function fn () {
    console.log(1)
 // 异步任务
    console.log(2)
}
let f = fn();
```

如果我们在上述代码的 异步任务位置添加一个异步任务，执行顺序就和我们的书写顺序不一致。

这个时候我们可以使用 generator 来解决这一问题，使我们代码的执行顺序和书写顺序一致

```javascript
function* fn() {
    console.log(1);

    console.log(2);
}

let f = fn();

// 执行函数
f.next()
```

我们使用添加一个*在 function和函数名之间，这样函数成为了一个 generator 函数，此时我们发现我们`let f = fn();`并没有让我们的函数执行，因为此时**返回的是一个迭代器函数**，函数原型上有 next 方法，调用next方法就能执行函数。

### yield

形式上，Generator 函数是一个普通函数，但是有两个特征。一是，`function`关键字与函数名之间有一个星号；二是，函数体内部使用`yield`表达式，定义不同的内部状态（`yield`在英语里的意思就是“产出”）

```javascript
function* fn() {
    console.log(1);

    yield console.log(2);

    console.log(3);
}

let f = fn();

// 执行函数
let rs = f.next()
```

此时我们通过 f.next() 使函数执行后，我们预期的打印 1 2  3 ,由于有yield的存在只打印了 1  2 就停止了



此时我们console.log(rs) 观察发现：

![](https://blog-1257919906.cos.ap-guangzhou.myqcloud.com/image/notes/es6/iterator1.png)

图中 返回 `{value: undefined, done: false}` 迭代器对象



由于 Generator 函数返回的遍历器对象，只有调用`next`方法才会遍历下一个内部状态，所以其实提供了一种可以暂停执行的函数。`yield`表达式就是暂停标志。

遍历器对象的`next`方法的运行逻辑如下。

（1）遇到`yield`表达式，就暂停执行后面的操作，并将紧跟在`yield`后面的那个表达式的值，作为返回的对象的`value`属性值。

（2）下一次调用`next`方法时，再继续往下执行，直到遇到下一个`yield`表达式。

（3）如果没有再遇到新的`yield`表达式，就一直运行到函数结束，直到`return`语句为止，并将`return`语句后面的表达式的值，作为返回的对象的`value`属性值。

（4）如果该函数没有`return`语句，则返回的对象的`value` 属性值为`undefined`。



执行过最后一个yield，返回的迭代器的 done 属性就会变为 true，表示迭代完成。

### 解决异步问题

```javascript
function* fn() {
    console.log(1);

    yield getData();

    console.log(3);
}

function getData() {
    setTimeout(() => {
        console.log(2);
        f.next(100);
    }, 1000);
}

// 返回一个迭代器函数
let f = fn();

f.next()
```

如果getData不加yield关键字的话，执行结果为 1 -> 3 -> 2

加入后就变成 1 -> 2 -> 3

将我们的异步代码从执行顺序上变得和我们的预期一样的同步

此时我们发现我们的函数每一次都要手动的next才会执行

下面我们就来编写一个简化的generator函数调用器

### 写一个简单的generator函数调用器

```javascript
function* fn() {
    console.log(1);

    let val = yield getData();
    console.log(val);

    // let val1 = yield getData();
    // console.log(val1);

    // let val2 = yield getData();
    // console.log(val2);



    console.log(3);
}

function getData() {
    return new Promise( (resolve, reject) => {
        setTimeout(() => {
            resolve(100);
        }, 1000);
    } );
}

function co( callback ) {

    let cb = callback();

    // co 递归的调用cb的next方法

    function next(d) {
        let result = cb.next(d); //{value,done}
        if (result.done) {
            return;
        }
        result.value.then( data => {
            next(data);
        } );
    }

    next();

}

co( fn );
```



## async函数

ES2017 标准引入了 async 函数，使得异步操作变得更加方便。

async 函数是什么？一句话，它就是 Generator 函数的语法糖。

### 极简解决异步问题

前面的Generator函数的一个例子：

```javascript
function* fn() {
    console.log(1);

    let val = yield getData();
    console.log(val);

    console.log(3);
}

function getData() {
    return new Promise( (resolve, reject) => {
        setTimeout(() => {
            resolve(100);
        }, 1000);
    } );
}
// 返回一个迭代器函数
let f = fn();

f.next()
```

我们使用async函数来重构她

```javascript
async function fn() {
    console.log(1);

    let val = await  getData();
    console.log(val);

    console.log(3);
}

function getData() {
    return new Promise( (resolve, reject) => {
        setTimeout(() => {
            resolve(100);
        }, 1000);
    } );
}

fn();
```

结构和普通函数没什么两样，在函数定义function前加上`async`关键字，再在 想要被同步化的函数钱加上`await`

这样就可以实现我们想要的同步效果



**!注意**：上面所说的同步，其实是异步的实现方式写法变得同步一样，但是实际上执行还是异步流程，这点要格外注意

### 一般使用try...catch...捕获error

```javascript
async function fn() {
    console.log(1);
    
    try {
        var v1 = await getData();

        console.log(3);
    } catch(e) {
        console.log(e);
    }; 
}

function getData() {
    return new Promise( (resolve, reject) => {
        setTimeout(() => {
            // resolve(100);
            reject('err');
        }, 1000);
    } );
}

fn();

// 1
// error
```

