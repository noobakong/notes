var util = require('../util/util')

function swap(arr, t1, t2) {
  let temp = arr[t1]
  arr[t1] = arr[t2]
  arr[t2] = temp
  delete temp
}

function bubbleSort (arr) {
  for (let i=0;i<arr.length-1;i++) {
    for (let j=0;j<arr.length-1-i;j++) {
      if (arr[j] > arr[j+1]) {
        swap(arr,j,j+1)
      }
    }
  }
  return arr
}

function bubbleSort2(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    // 有序标志，如果没有进行交换，也就是flag没有变成false，就说明数组有序，直接break
    let flag = true
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1)
        flag = false
      }
    }
    if (flag) {
      break
    }
  }
  return arr
}

function bubbleSort3(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    // 有序标志，如果没有进行交换，也就是flag没有变成false，就说明数组有序，直接break
    let flag = true
    let pos = 0 // 记录最后一次交换的位置
    let k = arr.length-1
    for (let j = 0; j < k; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1)
        flag = false
        pos = j
      }
    }    
    k = pos

    if (flag) {
      break
    }
  }
  return arr
}

let arr = [1,2,5,7,4,3,6,8,9,10]
util.testSort('三代',bubbleSort3,arr)
console.log(arr)
// util.testSort('三代', bubbleSort2, arr)
