
[TOC]



## 一、初识Vue
### 1.MVVM
> 什么是MVVM？
> 在Vue中，写的数据方法等都属于M层  模板标签就属于V层 写的代码都是在对数据进行操作 数据变化页面对应的V层自动跟着变 这就是VM层做的（Vue就是VM层）;
> 在Vue中 Vue作为VM层 对M层数据进行操作，数据改变后又通过VM层使数据驱动视图来改变V层，这就是数据驱动视图；

使用MVVM模式来进行开发，只需要对数据M层进行修改就可以了，在Vue开发中，我们应将注意力转移到M层；
使用MVP模式来开发，代码里会有很多关于DOM的操作，而使用MVVM模式来开发，Dom的操作被极大的简化了，代码量会得到显著的减少；

### 2.前端组件化
> 什么是前端组件化？
> 组件就是页面的一个部分，我们可以把一个页面切分成很多部分，每个部分都可以称为一个组件，合理的拆分组件，可以使复杂的大型开发分成很多小的部分，便于前期开发，也便于后期维护；

## 二、Vue基础
### 1.Vue实例
>  [sass](https://cn.vuejs.org/v2/guide/#声明式渲染)

```JavaScript
<body>
    <div id="root">
        <div @click="handleClick">
            {{message}}
        </div>
    </div>
</body>
<script>
    var vm = new Vue({
        el:'#root',
        data:{
            message:'hello Vue'
        },
        methods:{
            handleClick:function(){
                alert('hello')
            }
        }
    })
</script>
```

>每一个组件也是一个Vue实例，一个Vue项目就是很多Vue实例组成的；

>*vm.$data可以访问data中的数据，vm.$destroy是一个可以销毁vm实例的一个方法；属性名前加 $ 代表这个属性或方法是vue实例中的属性或方法*

###2.Vue实例的生命周期钩子
>生命周期函数就是vue实例在某一个时间点会自动执行的函数
>生命周期函数不放在vue实例的methods中，而是直接放在vue实例中

![Vue生命周期图](https://cn.vuejs.org/images/lifecycle.png "markdown" "width:80%;height:50%")

```JavaScript
<body>
    <div id="root">

    </div>
</body>
<script>
    //生命周期函数就是vue实例在某一个时间点会自动执行的函数
    var vm = new Vue({
        el: '#root',
        template: '<div>{{text}}</div>',
        data:{
            text:'hello'
        },
        beforeCreate() {
            console.log("beforeCreate")
        },
        created() {
            console.log("created")
        },
        beforeMount() {
            console.log(this.$el)
            console.log("beforeMount")
        },
        mounted() {
            console.log(this.$el)
            console.log("mounted")
        },
        beforeDestroy() {
            console.log(this.$el)
            console.log("beforDestroy")
        },
        destroyed() {
            console.log(this.$el)
            console.log("destroyed")
        },
        beforeUpdate () {
            console.log("beforeUpdate")
        },
        updated() {
            console.log("updated")
        }
        
    })
</script>
```
![生命周期钩子执行](http://pes1mlxa7.bkt.clouddn.com/%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E9%92%A9%E5%AD%90%E6%89%A7%E8%A1%8C.png)

> **注意：虽然vm.$destory()执行后页面中还有vm实例，并不是完全清空；但是此时的vm实例已经和页面断开连接，无法再使用vue更新视图**

除了以上的八个生命周期函数，还有三个生命周期函数
- activated
- deactivated
- errorCaptured

[11个生命周期函数官方文档](https://cn.vuejs.org/v2/api/#选项-生命周期钩子)

### 3.Vue的模板语法
- {{}}
- v-text
- v-html
- v-bind
- v-on
- v-model


### 4.计算属性，方法和侦听器
- 计算属性 computed

```JavaScript
<body>
    <div id="app">
        {{fullname}}
    </div>
</body>
<script>
    var vm = new Vue({
        el: '#app',
        data:{
            fitstname:'kong',
            lastname:'xiaobu'
        },
        computed: {
            fullname: function(){
                return this.fitstname + " " + this.lastname
            }
        }
    })
</script>
```
> 1.computed的每一个计算属性，都是一个方法
> 2.每一个方法最后都必须返回一个值
> 3.方法中调用的数据不要忘记加 **this**

>计算属性放在内存缓存中，如果计算一次以后计算的依赖的各项都没有再发生改变，那么这个计算属性就不会再次计算，增加性能效率

- 方法
```JavaScript
<body>
    <div id="app">
        {{fullname()}}
    </div>
</body>
<script>
    var vm = new Vue({
        el: '#app',
        data:{
            fitstname:'kong',
            lastname:'xiaobu'
        },
        methods: {
            fullname:function(){
                return this.fitstname+" "+this.lastname
            }
        }
    })
</script>
```
>  app容器中 -- {{fullname()}}  
>  这种方法的办法没有缓存机制，页面每次渲染改变一次他都要重新执行一次，效率低 不如计算属性

- watch 侦听器
```JavaScript
<body>
    <div id="app">
        {{fullname}}
    </div>
</body>
<script>
    var vm = new Vue({
        el: '#app',
        data:{
            fitstname:'kong',
            lastname:'xiaobu',
            fullname:'kong xiaobu'
        },
        watch:{
            fitstname:function(){
                this.fullname = this.fitstname +" "+ this.lastname;
            },
            lastname:function(){
                this.fullname = this.fitstname + " " + this.lastname;
            }
        }
    })
</script>
```
> 和computed都具备缓存机制，但是代码比computed复杂很多

 **computed计算属性，methods方法，watch侦听器都可选，但是优先选择computed**


### 5.计算属性的setter和getter

> 普通的计算属性:
> ```Javascript
> computed: {
            fullname:function(){
                return this.fitstname + " " + this.lastname
            }
        }
> ```

> 其中其实每一个计算属性都是一个对象，对象包含着get方法（取值时调用）和set方法（改值时调用）
> ```JavaScript
> computed: {
            fullname:{
                get:function(){
                    return this.fitstname + " " + this.lastname
                },
                set:function(value){   //这个value就是fullname被修改成的值
                    var arr = value.split(" ")
                    this.fitstname = arr[0]
                    this.lastname = arr[1]
                    console.log(value)
                    console.log(this.fitstname)
                }
            }
        }
> ```

### 6.Vue中的样式绑定
> 面向数据的Vue怎么能修改样式呢？？

**1. Class的对象绑定**
 举一个例子来说明：
 这里要使得`div`中的文字点击变色
 a,绑定一个点击事件在div上 `@click="handleDivClick"`,而后在vm实例的methods添加这个方法
 b,在这个div上添加```:class="{activated:isActivated}"``` 
 >其中**activated**是在类名 **isActivated**是vm实例中data中的数据，布尔类型，当isActivated为true时，activated类作用到div上，当isActivated为false时，则不作用在div上，在style中定义activated的样式，即可实现通过vue改变数据从而间接的控制样式的改变

**2. Class可以和数组绑定**
还是前面的那个例子
```JavaScript
<div @click="handleDivClick"
         :class="[activated]"  
    >
------------------------------------------------
 var vm = new Vue({
        el: '#app',
        data:{ // isActivated:false
            activated:""
        },
        methods: {
            handleDivClick:function(){
                this.activated = (this.activated === "activated" ? "":"activated")
            }
        }
    })
```
> 其中div class绑定的数组中，都是一个变量，这个变量可以定义在vm实例的data属性中，刚开始为空，通过handleDivClick点击函数当用户点击div后 ，通过`this.activated = (this.activated === "activated" ? "":"activated")`来给activated这个变量赋值，先前在style中已经定义过activated的样式，这样就能实现样式的转换

> **这种方法可以在数据里添加多个变量，作用于多个样式**

**3.直接绑定style改样式**
```JavaScript
<body>
    <div id="app">
        <div :style="styleObj" @click="handleDivClick">
            Hello Vue
        </div>
    </div>
</body>
<script>
    var vm = new Vue({
        el: '#app',
        data: {
            styleObj:{
                color:"black"
            }
        },
        methods: {
            handleDivClick:function(){
                this.styleObj.color = this.styleObj.color === "black" ? "red" : "black";
            }
        }
    })
</script>
```

> 直接` :style="styleObj"`来绑定样式 其中styleObj是一个定义在data的style样式对象 ：绑定机制就能讲样式作用与div中

>如果将`:style="styleObj"` 改为2中的数组的形式，数组的每一项都是一个style样式对象，这样就可以实现多样式的叠加
>  `<div :style="[styleObj,{fontSize:'20px'}]" @click="handleDivClick">`

###Vue中的条件渲染 `v-if` `v-show`

```Javascript
<body>
    <div id="app">
        <div v-if="show">{{message}}</div>
    </div>
</body>
<script>
    var vm = new Vue({
        el: '#app',
        data: {
          show:true,
          message:"hello World"
        }
    })
</script>
```
> `v-if`和`v-show`的区别？
> `v-show`不管页面中是否显示，他都已经渲染，只不过样式为隐藏不显示而已；而`v-if`如果条件不成立的话，元素节点直接在页面中移除，而不是像`v-show`Dom节点还在页面中
>  **如果频繁的将一些节点在页面上删除又添加的话，那么v-show相比于v-if效率更高 yo~**

`v-if`高级使用：可以和`v-else`联合使用，两者一块使用必须紧贴在一起使用，中间不能夹着其他的标签 yo~
```JavaScript
<body>
    <div id="app">
        <div v-if="show">{{message}}</div>
        <div v-else>Yooo</div>
        <!--亦可以使用 v-if  v-else-if v-else联合使用-->
    </div>
</body>
<script>
    var vm = new Vue({
        el: '#app',
        data: {
          show:true,
          message:"hello World"  
        }
    })
</script>
```
### 7.Vue的列表渲染
```JavaScript
<body>
    <div id="app">
        <div v-for="(item, index) in nums" :key="index">{{item}} --- index = {{index}}</div>
    </div>
</body>
<script>
    var vm = new Vue({
        el: '#app',
        data: {
          nums:[1,2,3,4,5,6,8,7,6]
        }
    })
</script>
```
> 在项目开发中，我们要给每渲染的每一项制定key值以提高性能，但是这个key值最好不要用index来指定，因为这样可能会影响dom的复用，通常在开发过程中，后端返回的json字符串对象中，往往会含有一个唯一标识符 **id** 我们可以拿这个id作为我们列表渲染的key值

----
**改变渲染数组来改变页面的方法**
当我们尝试修改数组来改变页面的时候，我们不能使用通过数组下标添加数组的方法来实现这个目的，我们必须使用vue提供的数组更新检测的几个**变异方法**来实现:

    push()    在最后追加一项
    pop()     删除最后一项
    shift()   把数组的第一项删除掉
    unshift() 数组第一项加入内容
    splice()  对数组进行截取
    sort()    对数组进行排序
    reverse() 对数组进行翻转

> 除此之外，我们还可以改变数组的引用，也能使vue重新渲染，从而来改变页面

当我们需要为多个元素同时进行操作的时候，我们可以在这几个元素外加一个div父元素包裹着他们以进行操作，但是有的时候我们并不想额外的再加入div元素，这是我们就可以使用`template` 标签来代替div父元素，效果相同，但是这个标签不会再页面中渲染，非常方便

> **渲染一个对象时，key值就是键值对的名字，当想往对象里动态的加值，常规的方法是不会在页面中动态渲染出来的，和前方数组一样，可以改这个对象的引用，往里加数据，就能实现动态改变了**

-------------------
### 8.Vue的set方法
**对象中的set方法**
> 要想动态的改变对象的渲染，也可以使用Vue的set方法 `Vue.set(vm.对象名,"键值对名","键值对值")`


> set方法不但是Vue的全局方法（使用`Vue.set(vm.对象名,"键值对名","键值对值")`来调用），也可以作为Vue的实例方法 `vm.$set(vm.对象名,"键值对名","键值对值")`

**数组中的set方法**

>对于数组，除了变异方法可以改变数以外，我们还可以使用数组中的set方法来操作数组的每一项
```JavaScript
<body>
    <div id="app">
        <div v-for="(item,key) of userInfo">{{item}} -- {{key}}</div>
    </div>
</body>
<script>
    var vm = new Vue({
        el: '#app',
        data: {
            userInfo:[1,2,4,5,7]
        }
    })
</script>
```
**`Vue.set(vm.userInfo,1,5)`或者`vm.$set(vm.userInfo,2,10)` 前者使得数组的第一项改为5，后者使得数组的第二项改为10**

---------------

>**至此，我们改变数组的方法有三中方法**
> 1. 改变数组的引用
> 2. 使用vue提供的数组变异方法
> 3. 使用vue的set方法

>**同样的，对象的更改也可以是有两种**
> 1. 改变对象的引用
> 2. 使用vue的set方法


## 三、深入理解vue的组件 组件使用中的细节点
### **1.组件中的is属性**

先来看代码:
```JavaScript
<body>
    <div id="app">
        <table>
            <tbody>
                <row></row>
                <row></row>
                <row></row>
            </tbody>
        </table>
    </div>
</body>
<script>
    Vue.component('row',{
        template:'<tr><td>this is a row</td></tr>'
    })
    var vm = new Vue({
        el:'#app'
    })
</script>
```
我们的本意是想添加组件到tbody中生成表格，**但是html规定tbody下只能是tr**，所以页面渲染完成的页面是3个tr被渲染到与tbody同级的节点上，想要解决这个问题，我们可以使用组件中的**is属性**

```JavaScript
//修改为下面的代码即可
<tbody>
    <tr is="row"></tr>
    <tr is="row"></tr>
    <tr is="row"></tr>
</tbody>
```
> tbody下的tr标签 ul下的li标签，select下的option标签组件 都最好使用is属性 避免程序出现bug

### 2.非根组件中的data必须是一个函数
> **非根组件**中的data必须是一个函数,必须返回一个对象，对象里包含着数据；
> 	之所以这么设计，是因为一个组件大多数情况下要被多处调用，每一处调用时返回的数据都应该是不一样的，所以这样把data作为一个函数来返回一个对象的设计，目的是为了使每个组件都有自己的数据，避免其间的相互影响；

### 3.ref的使用
- **在某些必要的情况下 使用vue必须要操作页面中的dom ，这时就要 使用ref属性**

    例如：
    ```JavaScript
    <div ref='hello' @click="handleClick">hello vue</div>
    ```
    如果此时我们想通过点击事件，打印div元素中的文本内容，就要使用ref属性
    我们通过添加`ref='hello'`的方法 为dom添加一个ref属性，至此，我们就可以通过`vm.$refs.hello.innerHTML`来访问dom节点中的文本
    > vm.$refs 代表整个vm中所有的引用 其中有一个引用名为hello
     this.$refs.hello 就是绑定ref的dom节点 这里就是 `<div>hello vue</div>`  
     可以使用this.$refs.hello.innerHTML来获取dom节点文本

- **ref同时也可以作用于组件，可以获取组件在页面的引用**

	还是通过举例子来说明问题
    ```JavaScript
  <body>
    <div id="app">
        <counter ref="one" @change="handleChange"></counter>
        <counter ref="two" @change="handleChange"></counter>
        <div>{{total}}</div>
    </div>
</body>
<script>
    Vue.component('counter',{
        data:function(){
            return {
                number:0
            }
        },
        template:"<div ref='hello' @click='handleClick'>{{number}}</div >",
        methods: {
            handleClick: function () {
                this.number++
                this.$emit('change') //当组件发生改变触发change 子组件向父组件传值
            }
        }
    })
    var vm = new Vue({
        el:'#app',
        data:{
            total:0
        },
        methods:{
            handleChange:function(){
                this.total = this.$refs.one.number + this.$refs.two.number
                // console.log(this.$refs.one.number)
                // console.log(this.$refs.two.number)
            }
        }
    })
</script>
    ```
    问题：以上，定义了一个counter的计数器组件，通过点击使得自己初始为0的number自增加1，此时，我们在页面中引进了两个counter组件，又想在下面的total数据中显示两个组件的number数字之和

    实现：
    1.如代码定义counter组件，在methods的handleClick方法中 添加了 `this.$emit('change')`
>this.$emit用于子组件向父组件传值， this.$emit('change') //当组件发生改变触发change 子组件向父组件传值

	2.在子组件中绑定change事件 `@change="handleChange"`和**ref** `ref="one"` and `ref="two"`
	>**这里的ref**就能获取每个组件的引用 从而为后续去得里面的数据打下基础
	
	3.在父组件中添加handleChange方法
	>```JavaScript
	>handleChange:function(){
	            this.total = this.$refs.one.number + this.$refs.two.number
	            // console.log(this.$refs.one.number)
	            // console.log(this.$refs.two.number)
	        }```
	这个的this.$refs.one和this.$refs.two就是页面中使用的俩个组件的引用，直接通过赋值就能使父组件data中的total值动态的变化

###4.父子组件的消息传递
> 刚开始学这方面的知识时，我被这些父子传的迷迷糊糊，后来仔细琢磨发现，父组件向子组件传值，就是在Vue创造的实例对应的根节点中添加数据，然后再这个数据想传到组件中使用；而子组件想父组件传值就是，数据首先在组件定义部分中，我们想在我们的vue实例的根节点元素中使用这个数据；父子组建的传值关系，这样理解，对我这样的新手来说就会很好理解

-------
>	单项数据流的概念
 	父组件可以向子组件传递参数，传递参数可以随意修改，但是子组件不能修改父组件传递过来的数据，子组件只能用，不能改
	原因在于一旦传递过来的值 作为一个对象数据，可能多个子组件公用这个父组件传递过来的值，如果子组件可以任意修改其值，可能会造	 成其他的bug
	要想使用并修改父组件传递过来的值 我们可以在组件的data函数中 return的对象中定义一个数据number等于this.count 就相当于	复制一份副本进行修改编辑,原数据不动

-------------


-  **父组件向子组件传递数据**
>父组件-->子组件
父组件通过**属性**的形式向子组件传递数据
父组件通过 :count属性向子组件传递数据，子组件需要在组件添加 props 项，来接受父组件的数据
props是一个数组或对象，父子间传递的所有数据都要作为数组或对象的项在props初始化

```JavaScript
<body>
    <div id="app">
        <counter :count="0"></counter>
        <counter :count="2"></counter>
    </div>
</body>
<script>
    var counter = {
        props:['count'],
        data:function(){
            return{
                number: this.count
            }
        },
        template: '<div @click="handleClick">{{number}}</div>',
        methods: {
            handleClick:function(){
                this.number ++  //这里能执行，但是会报错
                //单项数据流的概念
                //父组件可以向子组件传递参数，传递参数可以随意修改，但是子组件不能修改父组件传递过来的数据，子组件只能用，不能改
                //原因在于一旦传递过来的值 作为一个对象数据，可能多个子组件公用这个父组件传递过来的值，如果子组件可以任意修改其值，可能会造成其他的bug
                //要想使用并修改父组件传递过来的值 我们可以在组件的data函数中 return的对象中定义一个数据number等于this.count 就相当于复制一份副本进行修改编辑,原数据不动
                //
            }
        }
    }
    var vm = new Vue({
        el: '#app',
        data: {

        },
        methods: {

        },
        components: {
            counter
        }
    })
</script>
```


- 子组件向父组件传值
>子组件->父组件
>子组件向父组件传值是通过**事件**的方式来进行

	在子组件的执行方法中可以通过$emit绑定事件到父组件
	```JavaScript
	 methods: {
	    handleClick:function(){
		this.$emit('inc',1)
 }
 }
    ```
然后在父组件页面的子组件标签中绑定$emit传递的事件
    ```JavaScript
     <counter :count="3" @inc="handleNumChange"></counter>
     <counter :count="2" @inc="handleNumChange"></counter>
     <div>{{total}}</div>
    ```
其中绑定属性的名字要和$emit中定义的名字保持一致，随后在父组件中就能使用子组件传递来的值了，在父组件的方法定义中的形参就是$emit中方法名的后面的项
>**注意：这里绑定的方法属性名不能用驼峰式命名**


###5.组件参数校验与非props特性
**组件参数校验**
> 父组件向子组件传值的时候，我们会把传递的值在子组件的props里初始化一下，正常情况是这样` props:['content']`如果我们对父组件传过来的值有一定的筛选要求，我们可以将props作为对象，来增加筛选条件
> ```JavaScript
> props:{
    //content:Number 只能是数字
    //content:[Number,String] 可以是数字也可以是字符串
    content:{
    	content: {
                type: String, //数据类型
                required:true, //这个content父组件中必传
                default:'default value', //如果required设置为false时 默认的值为default的值
                validator:function(value){ //校验器 value是校验的内容 里面可以写函数
                    return (value.length > 5)
                }
          }
    }
},
> ```
像如上的代码所示我们可以对props的值进行筛选
复杂筛选可以使用对象来进行
- type：数据类型
- required：true  这个数据父组件必须传
- dafault 当required为false时 可以默认一个数据值
- **validator** 校验器 value是校验的内容 里面可以写函数，从而实现更复杂的自定义筛选规则

**非props特性**
> 什么是props特性？
> 父组件向子组件传递，子组件的props接受数据，但是渲染节点上不显示父组件的数据属性，但是子组件能使用这个数据， 这叫props特性

-----
> 什么是非props特性？
> 父组件传值，而子组件没有props接受这个值，不去接受，子组件就不能使用这个数据；这种情况是非props特性
> 非props特性会显示在dom属性上

###6.非父子组件间的传值
> 如果两个组件不是父子关系，那么这两个组件该怎么传递消息呢？
> - 我们可以使用Vuex（后面会涉及到）
> - 也可以使用Bus/总线，又成为发布订阅模式，观察者模式 来解决这个问题

总线-发布订阅模式：
```JavaScript
<body>
    <div id="app">
        <child content="dell"></child>
        <child content="lee"></child>
    </div>
</body>
<script>
    Vue.prototype.bus = new Vue()  //给每一个vue实例原型上都添加一个bus new的一个Vue

    Vue.component('child',{
        data:function(){
            return{
                selfContent:this.content
            }
        },
        props:{
            content:String
        },
        template:"<div @click='handleClick'>child-{{selfContent}}</div>",
        methods:{
            handleClick:function(){
                // alert(this.content)  测试
                this.bus.$emit('change',this.selfContent)  
            }
        },
        mounted:function(){
            var this_ = this
            this.bus.$on('change',function(msg){
                this_.selfContent = msg
            })
        }
    })
    var vm = new Vue({
        el:'#app',

    })
</script>
```

> 目的：我们想要页面的两个组件点击其中的一个，另外一个就和点击的组件内容同步

> 这两个组件属于兄弟组件，不是父子组件的关系，如果传递消息呢？
> 1. 首先在vue的原型链上添加一个bus赋值为一个vue实例； ` Vue.prototype.bus = new Vue() `
> 2. 像父子组件传值一样父组件通过属性的形式子组件props接受数据，因为我们后续要改变这个值，所以我们把父组件传过来的值通过data函数保存一份副本供之后修改操作
> 3. 在子组件上增加点击函数并在method中加以定义，函数中通过` this.bus.$emit('change',this.selfContent)`实现值的传递；
> 4. 要增加一个mounted的生命周期函数钩子，来实现传递
> ```JavaScript
> mounted:function(){
>           var this_ = this
>           this.bus.$on('change',function(msg){
>               this_.selfContent = msg
>           })
>       }
> ```
```
> change是3中定义的change，两者要保持一直，msg形参是3中的this.selfcontent
------
>**以上，一个非父子组件的传递就通过bus总线/发布订阅者模式的形式得到实现**

###7.在Vue中使用插槽
**插槽的使用场景**
> 我们知道，父组件向子组件传值可以使用props接受消息，但是如果父组件想传给子组件一个dom结构，里面包含着很多文本内容，这是我们如果再使用props来接受父组件的属性数据，也是可以实现的，但是我们的代码质量会降低，这时，我们就可以使用Vue的插槽

​```JavaScript
<body>
    <div id="app">
        <child content='Yooo'>
            <p>插槽内容</p>
        </child>
    </div>
</body>
<script>
    Vue.component('child',{
        props:['content'],
        template:`<div>
                    <p>hello</p>
                    <slot></slot>
                 </div>`
    })
    var vm = new Vue({
        el:'#app'
    })
</script>
```
>如代码所示，我们在我们的父组件的child 下加入p标签内容，然后就可以在子组件中使用后`<slot></slot>`标签，标签里的内容就是child组件下插入的dom结构
>
>但是我们有的时候插入的dom结构不止一个并且有顺序要求，这个时候我们就要使用到我们的**具名插槽**
>```JavaScript
><body>
>   <div id="app">
>       <child content='Yooo'>
>           <p slot="chacao1">插槽内容1</p>
>           <p slot="chacao2">插槽内容2</p>
>       </child>
>   </div>
></body>
><script>
>   Vue.component('child', {
>       props: ['content'],
>       template: `<div>
>                   <slot name='chacao1'></slot>
>                   <p>hello</p>
>                   <slot name='chacao2'></slot>
>                </div>`
>   })
>   var vm = new Vue({
>       el: '#app'
>   })
></script>
>```
```
如代码所示，我们只要在多个dom结构上添加一个插槽名字，slot="插槽名字"
而后我们在子组件使用的时候，只需要在slot的标签中 添加name属性，name属性与之前的插槽名字相对应，这样就可以实现精准的使用插槽中的某一个dom节点了


```



## 四、vue中的动画特效

### 1.vue动画的原理

**进入动画的过程图**



![](http://pes1mlxa7.bkt.clouddn.com/vue-%E5%8A%A8%E7%94%BB%E5%8E%9F%E7%90%86.png)



**离开动画的过程图**

![](http://pes1mlxa7.bkt.clouddn.com/vue-%E5%8A%A8%E7%94%BB%E5%8E%9F%E7%90%862.png)



> 我们想要增加动画效果，可以把要实现动画的内容用transiton标签包裹起来 可以给标签起一个任意的name值
>
>   **原理：**
>
>    **进入动画：**
>
> 1. 动画执行前会向trans标签包裹的div上增加fade-enter 和 fade-enter-active
>
>    当动画运行之前一直到开始运行第一帧的时候，fade-enter 和 fade-enter-active的样式作用在页面上
>
> 2. 当动画开始运行的时候 fade-enter这个样式类就会被vue移除
>
> 3. 当进入动画效果结束的时候，fade-enter-active和fade-enter-to 都被vue删除
>
> ​    **离开动画：**
>
> 1. 动画刚离开的一瞬间 fade-leave 和 fade-leave-active 作用在 div元素上
> 2. 当离开动画开始执行的时候，fade-leave被vue抹除，又添加上了fade-leave-to的属性 
> 3. 最后当动画执行完毕的时候，fade-leave-active和fade-leave-to都被删除掉****

> 当进入动画的时候  v-enter-active类是一直存在的
>
> 而当离开动画的时候 v-leave-active类是一直存在的

> **注意：** 以上的类中的fade是因为trans标签中定义的name名字为fade，当没有制定名字的时候默认为 **v**
>
> ​	     我们可以通过在transition标签里添加自己的类名来更改默认类名
>
> ​	     `	     enter-active-class="active"   leave-active-class="leave"`



```javascript
<style>
        .fade-enter,
        .fade-leave-to{
            opacity: 0;
        }
        .fade-enter-active,
        .fade-leave-active{
            transition: opacity 3s;
        }

    </style>
</head>
<body>
    <div id="root">
        <transition name="fade">
        <div v-if="show">hello vue</div>
        </transition>
        <!-- 
            我们想要增加动画效果，可以把要实现动画的内容用transiton标签包裹起来 可以给标签起一个任意的name值
            原理：
            进入动画：
            1.动画执行前会向trans标签包裹的div上增加fade-enter 和 fade-enter-active
              当动画运行之前一直到开始运行第一帧的时候，fade-enter 和 fade-enter-active的样式作用在页面上
            2.当动画开始运行的时候 fade-enter这个样式类就会被vue移除
            3.当进入动画效果结束的时候，fade-enter-active和fade-enter-to 都被vue删除

            离开动画：
            1.动画刚离开的一瞬间 fade-leave 和 fade-leave-active 作用在 div元素上
            2.当离开动画开始执行的时候，fade-leave被vue抹除，又添加上了fade-leave-to的属性 
            3.最后当动画执行完毕的时候，fade-leave-active和fade-leave-to都被删除掉
            
            以上的类中的fade是因为trans标签中定义的name名字为fade，当没有制定名字的时候默认为 v
         -->
        <button @click="handleClick">切换</button>
    </div>

    <script>
        var vm = new Vue({
            el:'#root',
            data:{
                show:true
            },
            methods: {
                handleClick:function(){
                    this.show = !this.show
                }
            }
        })
    </script>
</body>
```



### 2.vue中使用css动画库-animated.css动画

> 01我们可以知道，在transition标签中可以更改动画类的名字，我们可以结合animated.css动画来更好的工作。
>
> [animated.css官网](https://daneden.github.io/animate.css/)



```javascript
<transition
            name="fade"
            enter-active-class="animated swing"
            leave-active-class="animated shake"
        >
        <div v-if="show">hello vue</div>
</transition>
```



给进出场动画加入animated的类，并选择合适的动画类名，就能轻松实现动画效果；



> **至此，进入和离开动画都完成，但是我们有的时候想要在页面刷新的时候就直接会产生动画，该如何实现呢？**

> ```javascript
> <transition
>             name="fade"
>             appear
>             enter-active-class="animated swing"
>             leave-active-class="animated shake"
>             appear-active-class="animated shake"
>         >
>       <div v-if="show">hello vue</div>
> </transition
> ```
>
> 如代码所示，我们只需要在在标签中添加appear属性和一个appear-active-class类就可以了；



> **如果我们既想使用animate.css第三方库，有使用自己定义的`transiton`动画该怎么办呢？**
>
> 我们可以在enter-active-class和leave-active-class保留 fade-enter-active和fade-leave-active的类
>
> ```javascript
> <transition
> 		   type="transition"  //表示整个动画的时间与自定义的transition保持一致
> 		   //：duration="{enter:时间单位毫秒,leave:时间}" 更改动画时间
>             name="fade"
>             appear
>             enter-active-class="animated swing fade-enter-active"
>             leave-active-class="animated shake fade-leave-active"
>             appear-active-class="animated shake"
>         >
>         <div v-if="show">hello vue</div>
> </transition>
> ```



### 3.vue中的Js动画与velocity.js

> 不止是css能实现vue的动画效果，js也可以
>
> transition标签上能加载很多js钩子，@before-enter @enter @after-enter @before-leave @leave @after-leave

```javascript
<body>
    <div id="root">
        <transition
            name="fade"
            @before-enter="handleBeforeEnter"
            @enter="handleEnter"
            @after-enter="handleAfterEnter"
        >
        <div v-if="show">hello vue</div>
        </transition>
        <button @click="handleClick">切换</button>
    </div>

    <script>
        var vm = new Vue({
            el:'#root',
            data:{
                show:true
            },
            methods: {
                handleClick:function(){
                    this.show = !this.show
                },
                handleBeforeEnter:function(el){
                    // el.style.color = "red"
                    console.log("before-enter")
                },
                handleEnter:function(){
                    console.log("enter")
                },
                handleAfterEnter: function () {
                    console.log("AfterEnter")
                }
            }
        })
    </script>
</body>
```

**输出结果：**

![](http://pes1mlxa7.bkt.clouddn.com/vue-%E5%8A%A8%E7%94%BBjs%E9%92%A9%E5%AD%90.jpg)



> 有了几个js钩子，我们配合使用 velocity.js 来实现js动画的效果





### 4 vue中多个元素或组件的过渡

**多个dom的动画**

```css
<style>
        .fade-enter,
        .fade-leave-to{
            opacity: 0;
        }
        .fade-enter-active,
        .fade-leave-active{
            transition:opacity 1s; 
        }
</style>
```



```javascript
<body>
    <div id="root">
        <transition
            mode="in-out"
            name="fade"            
        >
        <div v-if="show" key="hello">hello vue</div>
        <div v-else key="bye">Bye Vue</div>
        </transition>
        <button @click="handleClick">切换</button>
    </div>

    <script>
        var vm = new Vue({
            el:'#root',
            data:{
                show:true
            },
            methods: {
               handleClick: function () {
                    this.show = !this.show
                },
            }
        })
    </script>
</body>
```



> 在style中定义了入场和出场东花园以后，我们会发现，并没有动画切换的效果
>
> 因为vue的节点复用机制的原因，会使我们的动画切换失效
>
> 这个时候我们为每个dom节点加入一个key值指定，这样就能实现动画的效果了
>
> 我们还可以在transition标签上添加mode属性 in-out先进后出  out-in 先出后进



**多个组件的动画**

```javascript
<body>
    <div id="root">
        <transition
            mode="in-out"
            name="fade"            
        >
        <component :is="type"></component>
        </transition>
        <button @click="handleClick">切换</button>
    </div>

    <script>
        Vue.component('child',{
            template:'<div>i am a child</div>'
        })
        Vue.component('child-one',{
            template:'<div>i am a childone</div>'
        })
        var vm = new Vue({
            el:'#root',
            data:{
                type:"child"
            },
            methods: {
               handleClick: function () {
                    this.type = this.type === 'child'? 'child-one':'child'
                },
            }
        })
    </script>
</body>
```

### 5.vue中列表渲染过渡动画

```javascript
<body>
    <div id="root">
        <transition-group>
            <div v-for="(item, index) in list" :key="item.id">{{item.title}}</div>
        </transition-group>
        <button @click="handleBtnClick">Add</button>
    </div>
    <script>
        var count = 0;
        var vm = new Vue({
            el: '#root',
            data: {
                list: []
            },
            methods: {
                handleBtnClick: function () {
                    this.list.push({
                        id: count++,
                        title: 'hello world'
                    })
                }
            }
        })
    </script>
</body>
```

> 在要渲染的元素节点外加入transition-group标签，会使渲染的每一项都加上一个transition标签，这样就能实现每一个列表项的动画；



###6.vue的动画封装
