# Vue的基本传值
## 父子组件的传值
>	单项数据流的概念
 	父组件可以向子组件传递参数，传递参数可以随意修改，但是子组件不能修改父组件传递过来的数据，子组件只能用，不能改。
	原因在于一旦传递过来的值，作为一个对象数据，可能多个子组件公用这个父组件传递过来的值，如果子组件可以任意修改其值，可能会造成其他的bug。
### 父子相互传值案例

**父组件App.vue**

```vue
<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <Son
      :msg="msg"
      :myage="age"
      @addAge="add"
    />
  </div>
</template>

<script>
import Son from './components/Son.vue'

export default {
  name: 'app',
  data() {
    return {
      msg: 'Vue父子组件的传值哦~',
      age: 20
    }
  },
  components: {
    Son
  },
  methods: {
    add() {
      this.age ++
    }
  }
}
</script>
```

**子组件Son.vue**

```vue
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>{{name}}</h2>
    <h3>{{myage}}</h3>
    <button @click='$emit("addAge")'>快快长大</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      name: 'noobakong',
    }
  },
  props: {
    msg: String,
    myage: Number
  }
}
</script>
```

### 父->子

我们先说父组件向子组件传值，父组件向子组件传值[通过 Prop 向子组件传递数据](https://cn.vuejs.org/v2/guide/components.html#通过-Prop-向子组件传递数据)

- 首先，父组件在`data`声明想要传给子组件的数据

- 在使用Son组件的时候，在component标签上绑定要传给子组件的数据

  ```vue
      <Son
        :msg="msg"
        :myage="age"
        @addAge="add"
      />
  ```

  msg和age分别是父组件data里定义的数据，而前面的`：msg`和 `:myage`则是我们要传值的自定义名称

  > 绑定的名称可以自定义，只要在子组件中保持一致即可。

- 在子组件的`props`选项中，填写要接受的父组件数据，名称为上面我们自定义的名称

  ```vue
  ...  
  props: {
      msg: String,
      myage: Number
   }
  ...
  ```

至此，我们就可以在子组件中随意调用父组件传递来的数据了，用法和自身data一样。 下图标红的msg 和 age 就是父向子传递的数据。

![](https://blog-1257919906.cos.ap-guangzhou.myqcloud.com/image/notes/vue/%E7%88%B6%E5%90%91%E5%AD%90.png)

### 子->父

> 简单的说子组件向父组件传值是通过自定义事件来实现的。

如代码所示，

- 我们在子组件的`button`标签绑定一个自定义事件`addAge`

  ```vue
      <button @click='$emit("addAge")'>快快长大</button>
  ```

- 在父组件的子组件标签中做出对应的响应  (第7行代码)

  ```vue
  <template>
    <div id="app">
      <img alt="Vue logo" src="./assets/logo.png">
      <Son
        :msg="msg"
        :myage="age"
        @addAge="add"
      />
    </div>
  </template>
  ```

  我们在methods选项中编写我们的add函数，这样就可以通过子组件向父组件传值影响父组件的行为了。

  如果我们需要传递参数的话，可以通过`$emit("fun",arg)`的形式形参传值

### 注意点

新手容易迷惑的地方：

- 父子组件的区分

  不是开玩笑，我相信很多新手都会有这样的迷惑。
  其实很好区分的，比如说次例子中的App组件中使用了Son组件，我们就可以判断出App为父Son为子，好好撸清其中关系。

- 定义的变量名混乱

  父组件的值可以通过自定义名称传给子组件

  子组件的`$emit("fn")`自定义函数fn的名称也可以自定义

  这里面的对应关系找好，就很明白啦


## Bus/总线

### 理解

这里再说一种组件传值的方法，bus总线传值，多用于**简单的兄弟组件之间**的传值。

非父子间的通讯可以通过实例一个vue实例Bus作为媒介，要相互通信的兄弟组件之中，都引入Bus，之后通过分别调用Bus事件触发和监听来实现组件之间的通信和参数传递。

**简单理解：两个兄弟组件找一个Vue实例作为一个信息中转站，想象成两个兄弟没办法联系到，但是他们都一个叫Bus的爸爸，通过爸爸中转两个兄弟就可以进行信息通讯。**

### 简单实现

**目录**

bus总线传值
​	boyA.vue
​	boyB.vue
​	bus.js

 

**在bus.js里面 写入下面信息**

```javascript
import Vue from 'vue'
export default new Vue;
```



**在需要通信的组件都引入Bus.js**    

如果你的bus.js是自定义一个bus的文件那from后面就改成你的所放的位置

```
1 import Bus from './bus.js'
```

   

 **接下来就是要组件通信**

 boyA组件添加一个 触发 #emit的事件按钮

```vue 
<template>
  <div>
    <button @click="bus">按钮</button>
  </div>
</template>

<script>
import Bus from './bus.js'
export default {
  data() {
    return {
      msg: ''
    }
  },
  methods: {
    bus() {
      Bus.$emit('msg','给你发消息了 boy-B')
    }
  }
}
</script>

<style scoped>

</style>

```



打开要和$emit通信的另外一个组件boyB组件  添加在钩子函数中监听msg事件

[![复制代码](http://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
<template>
  <div id="on">
      <p>{{msg}}</p>
  </div>
</template>

<script>
import Bus from './bus.js'
export default {
  data() {
    return {
      msg:  ''
    }
  },
  mounted() {
      let self = this
      Bus.$on('msg', (e) => {
      self.msg = e
      window.console.log(`传来的数据是：${e}`)
    })
  }
}
</script>

<style scoped>

</style>
```

至此，bus总线控制数据传输就简单实现了，下图预览效果

![](https://blog-1257919906.cos.ap-guangzhou.myqcloud.com/image/notes/vue/bus%E4%BC%A0%E5%80%BC.png)

### 最后

这里只是总结了简单的组件传值，大型项目多用Vuex来控制管理状态。有空了再总结关于Vuex的相关笔记！