const util = require('../util/util')

// 插入排序算法
function insertionSort(arr) {
  // 默认第一个位置与自己相比已经有序，i从1开始而不是0
  for (let i = 1; i < arr.length; i++) {
    // 取一份待插入数的备份
    let e = arr[i]
    // j保存元素e应该插入的位置
    let j
    for (j = i; j > 0 && e < arr[j - 1]; j--) {
      arr[j] = arr[j - 1]
    }
    arr[j] = e
  }
  return arr
}

// 入口函数
function mergeSort (arr) {
  __mergeSort(arr,0,arr.length-1)
  return arr
}


// 一代归并
// // 递归使用归并排序，对arr[l...r]的范围进行排序
// function __mergeSort(arr,l,r) {
//   // 递归出口
//   if (l >= r) {
//     return
//   }
//   let mid = Math.floor((l + r) / 2)
//   __mergeSort(arr, l, mid) // T(N/2)
//   __mergeSort(arr, mid+1, r) // T(N/2)
//   __merge(arr,l,mid,r) // O(N)
//   // T(N) = 2T(N/2) + O(N) = O(NlogN)
// }


// 二代归并
// 改进 增加merge条件
// function __mergeSort(arr, l, r) {
//   if (l >= r) {
//     return
//   }
//   let mid = Math.floor((l + r) / 2)
//   __mergeSort(arr, l, mid)
//   __mergeSort(arr, mid + 1, r)
//   // 因为两块都是有序的，如果我们的前者的最大值比后者的最小值还要小，说明此时已经有序
//   if (arr[mid]>arr[mid+1])
//     __merge(arr, l, mid, r)
// }


// 三代归并
// 改进递归到底使用插入排序
function __mergeSort(arr, l, r) {
  // if (l >= r) {
  //   return
  // }
  if (r-l<=15) {
    __insertionSort(arr,l,r)
    return
  }
  let mid = Math.floor((l + r) / 2)
  __mergeSort(arr, l, mid)
  __mergeSort(arr, mid + 1, r)
  // 因为两块都是有序的，如果我们的前者的最大值比后者的最小值还要小，说明此时已经有序
  if (arr[mid] > arr[mid + 1])
    __merge(arr, l, mid, r)
}


function __merge(arr,l,mid,r) {
  let aux = new Array(r-l+1)
  let i = 0
  let p1 = l
  let p2 = mid + 1
  // 谁小往临时数组里就添谁的过程
  while (p1 <=mid && p2 <=r) {
    aux[i++] = arr[p1] < arr[p2] ? arr[p1++] : arr[p2++]
  }
  // 临界过程
  while(p1<=mid) {
    aux[i++] = arr[p1++]
  }
  while (p2<=r) {
    aux[i++] = arr[p2++]
  }
  for (let i = 0;i<aux.length;i++) {
    arr[l+i] = aux[i]
  }
}

// 归并优化使用的插入排序
function __insertionSort(arr,l,r) {
  // 默认第一个位置与自己相比已经有序，i从1开始而不是0
  for (let i = l; i <=r; i++) {
    // 取一份待插入数的备份
    let e = arr[i]
    // j保存元素e应该插入的位置
    let j
    for (j = i; j > l && e < arr[j - 1]; j--) {
      arr[j] = arr[j - 1]
    }
    arr[j] = e
  }
  // return arr
}

let arr = util.randomArray(50000,0,1000)
let arr1 = arr.slice()
let arr2 = arr.slice()

// // util.testSort('归并', mergeSort, arr1)
// util.testSort('插入', insertionSort, arr2)