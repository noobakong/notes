/*
我们想要数组中的项是多种多样的时候也能排序，比如整数，小数，字符，字符串，对象

在js中，对于数字/小数/字符/字符串，均可使用平时编写的排序算法。

如果是对象数组，要按照对象的某一项作比较

我们可以借用 Array.prototype.sort()方法

 */
let arr = [
  { name: 'bbb', age: 23 },
  { name: 'aaa', age: 19 },
  { name: 'ccc', age: 20 }
];

const compare = function (prop) {
  return function (o1, o2) {
    if (o1[prop] < o2[prop]) {
      return -1;
    } else if (o1[prop] > o2[prop]) {
      return 1;
    } else if (o1[prop] == o2[prop]) {
      return 0;
    }
  }
};
arr.sort(compare('age'));