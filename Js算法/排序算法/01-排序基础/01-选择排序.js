/*
顾名思义，选择排序，即选出当前最小的，放到合适的位置。

使用嵌套循环

- 第一层循环从0开始，用i来做标记， 指定元素为 arr[i]
- 第二层循环从 i+1开始，让arr中的i+1位置及以后的项与 i 项做比较，小于 arr[i] 则替换 使用 minIndex保存最小值的索引
 */

var util = require('../util/util')
// let arr = [2, 4, 6, 5, 10, 7, 9, 1, 8, 3]
// let str = ['a','c','b']
let arr = util.randomArray(10000, 0,1000)

function swap(arr, t1, t2) {
  let temp = arr[t1]
  arr[t1] = arr[t2]
  arr[t2] = temp
  delete temp
}


function selectionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let minIndex = i
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex])
        minIndex = j
    }
    swap(arr, i, minIndex)
  }
  return arr
}

util.testSort('选择排序', selectionSort, arr)
