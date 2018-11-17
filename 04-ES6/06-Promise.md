## 一、Promise

所谓Promise，像是一个容器，里面车有房者某个未来才会结束的事件，通常是一个异步操作的结果。

Promise是一个对象，也可以看成一个构造函数。她可以获取异步操作的消息。

### Promise的特点

#### 1. 对象的状态不受外界影响

Promise对象代表的一个异步操作，有三种状态：

- pending 进行中
- resolved (fulfilled) 已成功
- rejected 已失败

**只有异步操作的结果，可以决定当前的是哪一种状态**。其他手段无法改变。

#### 2. 一旦状态改变，就不会再变，任何时候都可以得到这个结果。

`Promise`对象的状态改变，只有两种可能：从`pending`变为`resolved`和从`pending`变为`rejected` ，只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。



> `Promise`也有一些缺点。首先，无法取消`Promise`，一旦新建它就会立即执行，无法中途取消。其次，如果不设置回调函数，`Promise`内部抛出的错误，不会反应到外部。第三，当处于`pending`状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。



### Promise基本使用

#### Promise

​                构造函数

​                接受一个参数：callback，我们把要执行的异步任务放置在这个callback中

​                Promise对象内部会维护一个状态

​                    默认是：pending

​                    成功：resolved

​                    失败：rejected

​                Promise对象下有一个方法：then，该方法在Promise对象的状态发生改变的时候触发then的回调



我们来创建一个Promise实例：

```javascript
let p1 = new Promise( ( resolve, reject ) => {

    // 当Promise被实例化的时候，callback的异步任务就会被执行

    // 我们可以通过传入的resolve, reject，去改变当前Promise任务的状态
    // resolve, reject是两个函数，调用resolve这个函数，会把状态改成resolved，调用reject函数会		  把状态改成rejected
    setTimeout(() => {
        console.log(1);
        reject();
    }, 1000);
} );
```



#### Promise.prototype.then()

`Promise`实例生成以后，可以用`then`方法分别指定`resolved`状态和`rejected`状态的回调函数。

`then` 会接受两个参数：这两个参数都是回调，当对应的promise对象的状态变成了`resolved` ，那么then的第一个callback就会被执行，如果状态变成了`rejected` ，那么then的第二个callback就会被执行

```javascript
let p2 = p1.then( () => {
    console.log('成功');
}, () => {
    console.log('失败');
} );

// 1
// 失败
```



`then`方法返回的是一个新的**默认状态为resolved的`Promise`实例**（注意，不是原来那个`Promise`实例）。因此可以采用链式写法，即`then`方法后面再调用另一个`then`方法。

```javascript
p1.then(() => {
    console.log(2);
},() => {
    console.log('a');
}).then(() => {
    console.log(3);
},() => {
    console.log('b');
}).then(() => {
    console.log(4);
},() => {
    console.log('c');
});

// 1
// 2
// 3
// 4
```

#### Promise.prototype.catch()

> `Promise.prototype.catch`方法是`.then(null, rejection)`的别名，用于指定发生错误时的回调函数。

```javascript
p1.then(() => {
    console.log(2);
},() => {
    console.log('a');
    return Promise.reject();
}).then(() => {
    console.log(3);
}).then(() => {
    console.log(4);
}).catch(err => {
    console.log('错了');
}).then(() => {
    console.log(5);
});

// 1
// a
// 错了
// 5
```

- catch和then一样也会返回一个默认resolved状态的promise对象，所以catch后的console.log(5) 被打印了出来
- `reject`方法的作用，等同于抛出错误。 所以第五行代码后就调到了catch捕获错误

> 一般来说，不要在`then`方法里面定义 Reject 状态的回调函数（即`then`的第二个参数），总是使用`catch`方法。

```javascript
// bad
promise
  .then(function(data) {
    // success
  }, function(err) {
    // error
  });

// good
promise
  .then(function(data) { //cb
    // success
  })
  .catch(function(err) {
    // error
  });
```

跟传统的`try/catch`代码块不同的是，如果没有使用`catch`方法指定错误处理的回调函数，Promise 对象抛出的错误不会传递到外层代码，即不会有任何反应。

####　Promise.all()

`Promise.all`方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。

*形式上类似于数组的 Array.every 方法*

```javascript
let p1 = new Promise((resolve, reject) => {
    setTimeout(function() {
        resolve(1);
    }, Math.random() * 1000);
});
let p2 = new Promise((resolve, reject) => {
    setTimeout(function() {
        resolve(2);
    }, Math.random() * 1000);
});

// Array.every
const p = Promise.all( [p1, p2] ).then( data => {
    console.log(data);
}, err => {
    console.log(err);
} );

// (2) [1, 2]
```

上面代码中，`Promise.all`方法接受一个数组作为参数，`p1`、`p2`、都是 Promise 实例，如果不是，就会先调用下面讲到的`Promise.resolve`方法，将参数转为 Promise 实例，再进一步处理。（`Promise.all`方法的参数可以不是数组，但必须具有 Iterator 接口，且返回的每个成员都是 Promise 实例。）



p 的状态由数组Primise对象决定

- 每一个Promise对象的状态都变为 resolved ，则 p 为 resolved，此时**每一个promise对象的返回值组成一个数组，作为参数传递给p的回调函数**
- 只要任何一个promise对象的状态出现rejected，p就为 rejected， 此时**第一个被reject的实例的返回值传递给p的回调函数**



####  Promise.race()

*形式上类似于数组的 Array.some 方法*

与Promise.all() 的规则相对应

不同的是

Promise.race() 是Promise数组中只要有一个的状态是resolve，那么p的状态就是resolve

所有的状态都为reject时，p的状态才变成reject

```javascript
Promise.race( [p1, p2] ).then( data => {
    console.log(data);
}, err => {
    console.log(err);
} );
```



####  Promise.resolve()

有时需要将现有对象转为 Promise 对象，`Promise.resolve`方法就起到这个作用。

**（1）参数是一个 Promise 实例**

如果参数是 Promise 实例，那么`Promise.resolve`将不做任何修改、原封不动地返回这个实例。

**（2）参数是一个thenable对象**

`thenable`对象指的是具有`then`方法的对象，比如下面这个对象。

```javascript
let thenable = {
  then: function(resolve, reject) {
    resolve(42);
  }
};
```

`Promise.resolve`方法会将这个对象转为 Promise 对象，然后就立即执行`thenable`对象的`then`方法。

```javascript
let thenable = {
  then: function(resolve, reject) {
    resolve(42);
  }
};

let p1 = Promise.resolve(thenable);
p1.then(function(value) {
  console.log(value);  // 42
});
```

上面代码中，`thenable`对象的`then`方法执行后，对象`p1`的状态就变为`resolved`，从而立即执行最后那个`then`方法指定的回调函数，输出 42。

**（3）参数不是具有then方法的对象，或根本就不是对象**

如果参数是一个原始值，或者是一个不具有`then`方法的对象，则`Promise.resolve`方法返回一个新的 Promise 对象，状态为`resolved`。

```javascript
const p = Promise.resolve('Hello');

p.then(function (s){
  console.log(s)
});
// Hello
```

上面代码生成一个新的 Promise 对象的实例`p`。由于字符串`Hello`不属于异步操作（判断方法是字符串对象不具有 then 方法），返回 Promise 实例的状态从一生成就是`resolved`，所以回调函数会立即执行。`Promise.resolve`方法的参数，会同时传给回调函数。

**（4）不带有任何参数**

`Promise.resolve`方法允许调用时不带参数，直接返回一个`resolved`状态的 Promise 对象。

所以，如果希望得到一个 Promise 对象，比较方便的方法就是直接调用`Promise.resolve`方法。

```javascript
const p = Promise.resolve();

p.then(function () {
  // ...
});
```

上面代码的变量`p`就是一个 Promise 对象。

####  Promise.reject()

`Promise.reject(reason)`方法也会返回一个新的 Promise 实例，该实例的状态为`rejected`。