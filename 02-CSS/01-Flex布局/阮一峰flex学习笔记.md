## flex笔记 - 基础

> 最近在学习flex，看到阮一峰老师的博客有详细的关于flex的介绍，看着博客，记录下flex学习的笔记。

文章中的所有图示代码都放在了github上： [阮一峰flex博客跟学代码](https://github.com/noobakong/notes/tree/master/Flex%E5%B8%83%E5%B1%80)

传统的布局解决方案，基于**盒模型**， 依赖 display, position, float属性来进行布局，有的时候很不方便，实现垂直居中就很不方便。

### 一. Flex简介

Flex 是 Flexible Box 的缩写，译为**弹性布局**，用来为盒模型提供最大的灵活性。

任何一个容器都可以使用 Flex 布局

> 元素设置为Flex布局后，子元素的 `float`,`clear`, `vertical-align` 属性将失效

### 二. 基本概念

采用Flex布局的元素，为Flex容器，它所有的子元素自动成为容器成员，成为Flex成员，（flex item）

![Flex图解](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071004.png)

一个flex布局存在两根轴，水平横轴，也叫主轴（即图中的 **main axis**)  和 垂直纵轴 （**cross axis**）

横轴的开始位置，也就是图中左边框上的点集合， 叫做`main start`，结束位置，图中右边框的点集合，叫做`main end`，垂直纵轴的开始位置（上边框的点）叫做`cross start`，结束位置，下边框的点，叫做`cross end`，

每一个成员item的水平空间和垂直空间分别为 `main size`和 `cross size`

### 三. 容器属性

> 接下来的展示demo github项目中的代码为了方便有些属性写在了item成员上，最正确的方式是些在flex容器上。

#### 1. flex-direction

`flex-direction`属性决定水平横轴的方向（即项目的排列方向）。

它可取以下四个值

- `row`（默认值）：主轴为水平方向，起点在左端。
- `row-reverse`：主轴为水平方向，起点在右端。
- `column`：主轴为垂直方向，起点在上沿。
- `column-reverse`：主轴为垂直方向，起点在下沿。

![](http://pes1mlxa7.bkt.clouddn.com/flex-flex-direction.png)

#### 2. flex-wrap属性

默认情况下，项目都排在一条线（又称"轴线"）上。`flex-wrap`属性定义，如果一条轴线排不下，如何换行。

它可取三个值

- `nowrap`（默认）：不换行
- `wrap`：换行，第一行在上方
- `wrap-reverse`：换行，第一行在下方

> 如图我们可以发现，默认的nowrap属性的优先级是高于我们设置的width的。

![](http://pes1mlxa7.bkt.clouddn.com/flex-flex-wrap.png)

#### 3. flex-flow

`flex-flow`属性是`flex-direction`属性和`flex-wrap`属性的简写形式，默认值为`row nowrap`



#### 4. justify-content属性

`justify-content`属性定义了项目在水平横轴上的对齐方式

阮老师的博客图示：

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071010.png)

属性能取5个值

- `flex-start`（默认值）：左对齐
- `flex-end`：右对齐
- `center`： 居中
- `space-between`：两端对齐，项目之间的间隔都相等。
- `space-around`：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。

![](http://pes1mlxa7.bkt.clouddn.com/flex-justify-content.png)

#### 5. align-items属性 

`align-items`属性定义项目在垂直纵轴上如何对齐。 和justify-content属性一块记忆比较容易。

它可能取5个值

 - `flex-start`：交叉轴的起点对齐。
 - `flex-end`：交叉轴的终点对齐。
 - `center`：交叉轴的中点对齐。
 - `baseline`: 项目的第一行文字的基线对齐。
 - `stretch`（默认值）：如果项目**未设置高度**或设为auto，将占满整个容器的高度。

> 下图示例是的垂直纵轴方向是由上到下

![](http://pes1mlxa7.bkt.clouddn.com/flex-align-items.png)

#### 6. align-content属性

`align-content`属性定义了多根轴线的对齐方式。

`align-content`只适用于**多行** 的flex容器

该属性可能取6个值

- `flex-start`：与垂直轴的起点对齐。
- `flex-end`：与垂直轴的终点对齐。
- `center`：与垂直轴的中点对齐。
- `space-between`：与垂直轴两端对齐，轴线之间的间隔平均分布。
- `space-around`：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
- `stretch`（默认值）：轴线占满整个垂直轴。

![](http://pes1mlxa7.bkt.clouddn.com/flex-align-content.png)

### 四. item成员的属性

#### 1. order属性

`order`属性定义项目的排列顺序。数值越小，排列越靠前，默认为0

#### 2. flex-grow属性

`flex-grow`属性定义项目的放大比例，默认为`0`，即如果存在剩余空间，也不放大。

> 如果所有项目的`flex-grow`属性都为1，则它们将等分剩余空间（如果有的话）。如果一个项目的`flex-grow`属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。

#### 3. flex-shrink属性

`flex-shrink`属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。

> 如果所有项目的`flex-shrink`属性都为1，当空间不足时，都将等比例缩小。如果一个项目的`flex-shrink`属性为0，其他项目都为1，则空间不足时，前者不缩小。
>
> 负值对该属性无效。

#### 4. flex-basis属性

`flex-basis`属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为`auto`，即项目的本来大小。

> 它可以设为跟`width`或`height`属性一样的值（比如350px），则项目将占据固定空间。

#### 5. flex属性

`flex`属性是`flex-grow`, `flex-shrink` 和 `flex-basis`的简写，默认值为`0 1 auto`。后两个属性可选。

> 该属性有两个快捷值：`auto` (`1 1 auto`) 和 none (`0 0 auto`)。

#### 6. align-self属性

`align-self`属性允许单个项目有与其他项目不一样的对齐方式，可覆盖

![](http://pes1mlxa7.bkt.clouddn.com/flex-item.png)