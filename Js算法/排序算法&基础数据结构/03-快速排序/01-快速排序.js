var all = require('../util/allSort')
var util = require('../util/util')


function quickSort (arr) {
  // 对 arr[l...r] 进行快速排序
  __quickSort(arr,0,arr.length-1)
  return arr
}

/*---------- 初版快排 -------*/
// function __quickSort(arr,l,r) {
//   // 递归出口
//   if (l>=r) {
//     return
//   }
//   // 使用分割来获取中间元素的位置
//   let p = __partition(arr,l,r)
//   __quickSort(arr,l,p-1)
//   __quickSort(arr,p+1,r)
// }

/*---------- 第二版快排 插入排序优化 -------*/
// function __quickSort(arr,l,r) {
//   // 递归出口
//   if (r-l<=15) {
//     util.innerInsertionSort(arr,l,r)
//     return
//   }
//   // 使用分割来获取中间元素的位置
//   let p = __partition(arr,l,r)
//   __quickSort(arr,l,p-1)
//   __quickSort(arr,p+1,r)
// }

// 对arr[l...r] 进行partition操作
// 返回p arr[l...p-1] < arr[p]  arr[p+1,r] > arr[p]
// function __partition(arr, l, r) {
//   let v = arr[l]
//   // 这样定义j 就满足了 arr[l+1...j] 和 arr[j+1...i) 刚开始时都不存在
//   let j = l
//   for (let i = l + 1; i <= r; i++) {
//     // 当 (arr[i] > v) 直接i++ for循环就能控制 不用再写额外代码
//     if (arr[i] < v) {
//       util.swap(arr, i, j + 1)
//       j++
//     }
//   }
//   util.swap(arr, l, j)
//   return j
// }

/*---------- 第三版快排 随机数优化 -------*/
// function __partition(arr, l, r) {
//   let random = Math.floor(Math.random() * (r - l + 1)) + l
//   util.swap(arr, l, random)
//   let v = arr[l]
//   let j = l
//   for (let i = l + 1; i <= r; i++) {
//     if (arr[i] < v) {
//       util.swap(arr, i, j + 1)
//       j++
//     }
//   }
//   util.swap(arr, l, j)
//   return j
// }

// function __quickSort(arr, l, r) {
//   // 递归出口
//   if (r - l <= 15) {
//     util.innerInsertionSort(arr, l, r)
//     return
//   }
//   // 使用分割来获取中间元素的位置
//   let p = __partition(arr, l, r)
//   __quickSort(arr, l, p - 1)
//   __quickSort(arr, p + 1, r)
// }



// ------------------- 改变partition思路改进--------------------
function __quickSort(arr, l, r) {
  // 递归出口
  if (r - l <= 15) {
    util.innerInsertionSort(arr, l, r)
    return
  }
  // 使用分割来获取中间元素的位置
  let p = __partition(arr, l, r)
  __quickSort(arr, l, p - 1)
  __quickSort(arr, p + 1, r)
}

function __partition(arr, l, r) {
  let random = Math.floor(Math.random() * (r - l + 1)) + l
  util.swap(arr, l, random)
  let v = arr[l]
  // arr[l+1...i) <= v arr(j...r] >= v 
  // 初始化满足两块均为空
  let i = l+1
  let j = r
  while(true) {
    while(i<=r&&arr[i]<v) i++
    while(j>=l+1&&arr[j]>v) j--
    if(i>j) break
    util.swap(arr,i,j)
    i++
    j--
  }
  util.swap(arr, l, j)
  return j
}


// let arr = util.randomArray(1000000,0,10000)
// let arr1 = arr.slice()
// util.testSort('归并排序', all.mergeSort,arr)   
// util.testSort('快速排序', quickSort, arr1)

// let arr = util.generateNearlyOrderedArray(10000000, 10)
// let arr1 = arr.slice()
// util.testSort('归并排序', all.mergeSort, arr)
// util.testSort('快速排序', quickSort, arr1)

let arr = util.randomArray(10000000, 0, 100000)
let arr1 = arr.slice()
util.testSort('归并排序', all.mergeSort,arr)   
util.testSort('快速排序', quickSort, arr1)