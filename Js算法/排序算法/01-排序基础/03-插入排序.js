var util = require('../util/util')

function swap(arr, t1, t2) {
  let temp = arr[t1]
  arr[t1] = arr[t2]
  arr[t2] = temp
  delete temp
}

// 选择排序
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


// let arr = util.randomArray(10000, 0, 10000)
let NearlyArr = util.generateNearlyOrderedArray(10000,10)
// 插入排序一代
// function insertionSort (arr) {
//   // 默认第一个位置与自己相比已经有序，i从1开始而不是0
//   for (let i=1;i<arr.length;i++) {
//     for (let j=i;j>0;j--) {
//       if (arr[j] < arr [j-1])
//         swap(arr[j],arr[j-1])
//       else
//         break
//     }
//   }
// }


// 插入排序二代
// function insertionSort(arr) {
//   // 默认第一个位置与自己相比已经有序，i从1开始而不是0
//   for (let i = 1; i < arr.length; i++) {
//     for (let j = i; j > 0 && arr[j] < arr[j - 1]; j--) {
//       swap(arr,j, j - 1)
//     }
//   }
//   return arr
// }

// 插入排序三代
function insertionSort(arr) {
  // 默认第一个位置与自己相比已经有序，i从1开始而不是0
  for (let i = 1; i < arr.length; i++) {
    // 取一份待插入数的备份
    let e = arr[i]
    // j保存元素e应该插入的位置
    let j
    for (j = i; j > 0 && e < arr[j - 1]; j--) {
      arr[j] = arr[j-1]
    }
    arr[j] = e
  }
  return arr
}

function compare () {
  let arr1 = NearlyArr
  let arr2 = NearlyArr
  util.testSort('插入排序', insertionSort, arr2)
  util.testSort('选择排序', selectionSort, arr1)
  delete arr1
  delete arr2
}

compare()