# Set 和 Map

## Set

> es6提供了数据结构Set 它类似于数组，但是成员的值都是唯一的，没有重复的的值

### 集合

**集合的基本概念**：集合是有一组无序且唯一的，不能重复的项组成的。

这个数据结构使用了与有限集合相同的数学概念，应用在计算机的数据结构中。

**集合的特点：**key 和 value 相同 ，且没用重复项

### 1. 创建一个Set

```javascript
const s = new Set([1, 2, 3])
console.log(s)

typeof(s)
// "object"
```

### 2. Set类的属性

Set中有属性size，相当于Array中的length属性

```javascript
console.log(s.size)
// 3
```

### 3. Set类的方法

#### 3.1 set.add(value)

添加一个数据，返回Set结构本身

> add方法支持链式编程,不能添加已有的数据，否则会添加无效

```javascript
s.add('a').add('b')
console.log(s) // Set(5) {1, 2, 3, "a", "b"}
console.log(s.size) // 5
```

#### 3.2 set.delete(value)

删除指定数据，返回一个布尔值，表示是否删除成功

```javascript
var isdelete = s.delete(1)
console.log(isdelete) // ture
console.log(s) // Set(4) {2, 3, "a", "b"}
console.log(s.size) // 4
```

#### 3.3 set.has(value)

判断Set是否含有某一个数据

#### 3.4 set.clear()

清楚Set所有数据

#### 3.5 set.keys() 和 set.values()

这两个分别是遍历Set数据结构的 key值 和 value值 ，但是我们知道 ，在Set结构中，这两者的值是一样的

```javascript
const s = new Set([1, 2, 3])
s.add('a').add('b')
console.log(s.values())
console.log(s.keys())
// SetIterator {1, 2, 3, "a", "b"}
// SetIterator {1, 2, 3, "a", "b"}
```

#### 3.6 set.entries()

返回键值对的遍历器

```javascript
console.log(s.entries())
// SetIterator {1, 2, 3, "a", "b"}
```

#### 3.7 set.forEach()

使用回调遍历每一个成员

```javascript
s.forEach((value, key, set) => {
    console.log('value:' + value )
    console.log('key:' + key)
    console.log('set:' + set)
})
```

### 4. 使用Set方法来完成数组的去重

我们知道set数据结构的最大特点就是不能重复，我们可以利用这一特点，来简单粗暴的完成数组去重

```javascript
var array = [1,2,3,3,2,5,5]
var array2 = [...new Set(array)]
console.log(array2)
// [1, 2, 3, 5]
```



## Map

### 字典

用来存储不重复的key的Hash结构。不同于集合（Set）的是，字典使用的是键 [键， 值] 的形式来储存数据的。

> JavaScript 中的对象只能用字符串来当做键，这有很大的使用限制。

```javascript
var data1 = { a: 1 }
var data2 = { a: 2 }
var obj = {}
obj[data1] = 1
obj[data2] = 2
console.log(obj)
// Object
//    [object Object]: 2
//    __proto__: Object
```

我们会发现，最后的对象obj，只有一个` [object Object] ` 键，其值是我们最后一次赋值的 2

之所以出现这样的状况，就是因为**传统的js对象键只能是字符串**导致的

我们在执行上述代码 4-5 行的时候，js会将data1隐式转换为 字符串，我们可以调用对象的`toString` 来看一下：

```javascript
console.log(data1.toString()) // [object Object]
console.log(data2.toString()) // [object Object]
console.log(data1.toString() === data2.toString()) // true
```

至此，为什么上述的 [object Object]: 2 情况，大家都应该知道怎么回事了



ES6中为了解决这一问题，提供了Map数据结构。类似于对象，也是键值对的集合，但是键不再局限于字符串，各个类型的值都可以当做键

至此，Js中对象结构从 “字符串：值”  ---> 转换为 “值 : 值”  更完善的hash结构

### 1. 创建一个Map

```javascript
const map = new Map([
    ['a',1],
    ['b',2]
])
console.log(map)
// Map(2) {"a" => 1, "b" => 2}
```

### 2. Map类的属性

同Set一样，Map中有属性size

```javascript
console.log(map.size)
// 2
```

### 3. Map类的方法

#### 3.1 map.set(key, value)

添加一个数据，返回map结构本身

> set方法支持链式编程，如果多次添加相同的键值，后添加的会覆盖掉先前的。

```javascript
map.set('me','akong').set('you','cool')
// Map(4) {"a" => 1, "b" => 2, "me" => "akong", "you" => "cool"}
```

#### 3.2 map.get(key)

get方法读取key对应的键值，如果找不到key，返回undefined

```javascript
console.log(map.get('a')) // 1
console.log(map.get('me')) // akong
console.log(map.get('muhaha')) // undefined
```

#### 3.3 map.delete(key)

删除指定数据，返回一个布尔值，表示是否删除成功

```javascript
var bool = map.delete('a')
console.log(bool) // true
```

#### 3.4 map.has(key)

判断Set是否含有某一个数据,返回布尔值

#### 3.5 map.clear()

清楚Map所有数据，没有返回值

#### 3.6 map.keys() 

返回键名的遍历器

```javascript
console.log(map.keys())
// MapIterator {"a", "b", "me", "you"}
```

#### 3.7 map.values()

返回键值的遍历器

```javascript
console.log(map.values())
// MapIterator {1, 2, "akong", "cool"}
```

#### 3.8 map.entries()

返回键值对的遍历器

```javascript
console.log(map.entries())
// MapIterator {"a" => 1, "b" => 2, "me" => "akong", "you" => "cool"}
```

#### 3.7 map.forEach()

使用回调遍历每一个成员

```javascript
map.forEach(function (key, value, map) {
    ...
})
```

### 4. Map使用中一些注意事项

#### map中的NaN

在map中，会将NaN当成同一个数值来看待

```javascript
map.set(NaN,10).set(NaN,100)
// NaN => 100
```

#### 空对象{ }在map中

```javascript
map.set({}, 'x').set({},'y')
console.log(map)
```

以为创建的两个空对象的指向是不一样的，所以不会覆盖

#### map中的key 的顺序永远是按照添加顺序进行排列的





