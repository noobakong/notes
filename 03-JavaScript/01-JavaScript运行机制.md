## JavaScript 运行机制 & EventLoop

> 看[阮老师博客](http://www.ruanyifeng.com/blog/2014/10/event-loop.html)和自己的理解，记录的学习笔记，js的单线程和 事件EventLoop 机制。

### 1.  JavaScript是单线程

> JavaScript语言的一大特点就是单线程，也就是说，同一个时间只能做一件事。

js这门语言在刚开始创造时，就是作为浏览器脚本语言，只要用途是与用户互动，操作dom，这决定了它只能为单线程，单线程已成为JavaScript这门语言的核心特征，将来也不会改变。

> HTML5提出Web Worker标准，允许JavaScript脚本创建多个线程，但是子线程完全受主线程控制，且不得操作DOM。所以，这个新标准并没有改变JavaScript单线程的本质

### 2. 任务队列

单线程就意味着，所有任务需要排队，前一个任务结束，才会执行后一个任务。如果前一个任务耗时很长，后一个任务就不得不一直等着，导致很多时候CPU都是空闲着的。

> JavaScript语言的设计者意识到，这时主线程完全可以不管IO设备，挂起处于等待中的任务，先运行排在后面的任务。等到IO设备返回了结果，再回过头，把挂起的任务继续执行下去。

于是，JavaScript任务可以分两种，同步任务和异步任务

#### 同步任务

同步任务指的是，在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务。

#### 异步任务

异步任务指的是，不进入主线程，而进入`任务队列`中的任务，只有`任务队列`通知主线程，某个异步任务可以执行了，这个任务才会进入主线程执行。

**异步执行的具体运行机制**

> 同步执行也是如此，同步执行可以被视为没有异步任务的异步执行

1. 所有同步任务都在主线程上执行，形成一个[执行栈](http://www.ruanyifeng.com/blog/2013/11/stack.html)
2. 主线程之外，还存在一个"任务队列"，只要异步任务有了运行结果，就在"任务队列"之中放置一个事件。
3. 一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"任务队列"，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。
4. 主线程不断重复上面的第三步。

> 只要主线程空了，就会去读取"任务队列"，这就是JavaScript的运行机制。这个过程会不断重复。

![主线程和任务队列的示意图](http://www.ruanyifeng.com/blogimg/asset/2014/bg2014100801.jpg)

### 3. 事件和回调函数

`Event queue` - -- 任务队列 是一个事件的队列，IO设备完成一项任务，就会在任务队列中添加一个事件，表明相关的异步任务可以进行“执行栈”了，主程序读取任务队列，就是读取里面的事件。

`Event queue` 中的事件，除了IO设备的事件，还包括一些用户的操作事件，如鼠标点击，页面滚动等等，只要指定过回调函数，这些事件都会进入任务队列，当主线程开始执行异步任务，就是执行对应的回调函数。

"任务队列"是一个**先进先出**的数据结构，排在前面的事件，优先被主线程读取。主线程的读取过程基本上是自动的，只要执行栈一清空，"任务队列"上第一位的事件就自动进入主线程。

但是，由于存在"定时器"功能，主线程**首先要检查一下执行时间**，某些事件只有到了规定的时间，才能返回主线程。

### 4. Event Loop

> 主线程从"任务队列"中读取事件，这个过程是循环不断的，所以整个的这种运行机制又称为Event Loop（事件循环）。

![](https://blog-1257919906.cos.ap-guangzhou.myqcloud.com/image/notes/js-eventloop.png)

主程序运行时，产生堆和栈，栈中的代码调用各位外部的WEBAPI，他们在任务队列中加入各种事件，如图中的Click，Load，Done。只要栈中的代码执行完毕，主线程就会去读取"任务队列"，依次执行那些事件所对应的回调函数。

> 栈中的代码（同步任务）总是在任务队列（异步任务）之前执行

### 5. 定时器

> 除了放置异步任务的事件，"任务队列"还可以放置定时事件

定时器功能主要由setTimeout()和setInterval()这两个函数来完成，它们的内部运行机制完全一样，区别在于前者指定的代码是一次性执行，后者则为反复执行。以下主要讨论setTimeout()。

```javascript
setTimeout(function(){console.log(1);}, 0);
console.log(2);
```

上面代码的执行结果总是2，1，因为只有在执行完第二行以后，系统才会去执行"任务队列"中的回调函数，尽管设置的推迟毫秒数为0.

> HTML5标准规定了setTimeout()的第二个参数的最小值（最短间隔），不得低于4毫秒，如果低于这个值，就会自动增加。

**需要注意的是，**setTimeout()只是将事件插入了"任务队列"，必须等到当前代码（执行栈）执行完，主线程才会去执行它指定的回调函数。要是当前代码耗时很长，有可能要等很久，所以并没有办法保证，回调函数一定会在setTimeout()指定的时间执行。

### 6. Node.js的Event Loop

> Node.js也是单线程的Event Loop，但是它的运行机制不同于浏览器环境。

- **nodejs的event是基于libuv，而浏览器的event loop则在html5的规范中明确定义**。
- libuv已经对event loop作出了实现，而html5规范中只是定义了浏览器中event loop的模型，具体实现留给了浏览器厂商。

![](http://www.ruanyifeng.com/blogimg/asset/2014/bg2014100803.png)

根据上图，Node.js的运行机制如下。

> （1）V8引擎解析JavaScript脚本。
>
> （2）解析后的代码，调用Node API。
>
> （3）[libuv库](https://github.com/joyent/libuv)负责Node API的执行。它将不同的任务分配给不同的线程，形成一个Event Loop（事件循环），以异步的方式将任务的执行结果返回给V8引擎。
>
> （4）V8引擎再将结果返回给用户。

除了setTimeout和setInterval这两个方法，Node.js还提供了另外两个与"任务队列"有关的方法：[process.nextTick](http://nodejs.org/docs/latest/api/process.html#process_process_nexttick_callback)和[setImmediate](http://nodejs.org/docs/latest/api/timers.html#timers_setimmediate_callback_arg)。它们可以帮助我们加深对"任务队列"的理解。

- process.nextTick方法可以在当前"执行栈"的尾部----下一次Event Loop（主线程读取"任务队列"）之前----触发回调函数,它指定的任务总是发生在所有异步任务之前。
- setImmediate方法则是在当前"任务队列"的尾部添加事件，也就是说，它指定的任务总是在下一次Event Loop时执行，这与setTimeout(fn, 0)很像。

```javascript
process.nextTick(function A() {
  console.log(1);
  process.nextTick(function B(){console.log(2);});
});

setTimeout(function timeout() {
  console.log('Yo~~');
}, 0)
// 1
// 2
// Yo~~
```

> 上面代码中，由于process.nextTick方法指定的回调函数，总是在当前"执行栈"的尾部触发，所以不仅函数A比setTimeout指定的回调函数timeout先执行，而且函数B也比timeout先执行。这说明，**如果有多个process.nextTick语句（不管它们是否嵌套），将全部在当前"执行栈"执行。**

**现在，再看setImmediate**

```javascript
setImmediate(function (){
  setImmediate(function A() {
    console.log(1);
    setImmediate(function B(){console.log(2);});
  });

  setTimeout(function timeout() {
    console.log('TIMEOUT FIRED');
  }, 0);
});
```

上面代码中，setImmediate与setTimeout(fn,0)各自添加了一个回调函数A和timeout，都是在下一次Event Loop触发。那么，哪个回调函数先执行呢？答案是不确定。运行结果可能是1--TIMEOUT FIRED--2，也可能是TIMEOUT FIRED--1--2。



令人困惑的是，Node.js文档中称，setImmediate指定的回调函数，总是排在setTimeout前面。实际上，这种情况只发生在递归调用的时候。

```javascript
setImmediate(function (){
  setImmediate(function A() {
    console.log(1);
    setImmediate(function B(){console.log(2);});
  });

  setTimeout(function timeout() {
    console.log('TIMEOUT FIRED');
  }, 0);
});
// 1
// TIMEOUT FIRED
// 2
```

上面代码中，setImmediate和setTimeout被封装在一个setImmediate里面，它的运行结果总是1--TIMEOUT FIRED--2，这时函数A一定在timeout前面触发。至于2排在TIMEOUT FIRED的后面（即函数B在timeout后面触发），是因为setImmediate总是将事件注册到下一轮Event Loop，所以函数A和timeout是在同一轮Loop执行，而函数B在下一轮Loop执行。

**process.nextTick和setImmediate的一个重要区别：多个process.nextTick语句总是在当前"执行栈"一次执行完，多个setImmediate可能则需要多次loop才能执行完。**



js 和 node 的原理知识还是很多地方都不甚了解，加油努力学习！