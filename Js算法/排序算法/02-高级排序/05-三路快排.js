var all = require('../util/allSort')
var util = require('../util/util')

function quickSort3Ways(arr) {
  __quickSort3Ways(arr,0,arr.length-1)
}


// ----------------- 三路快速排序 -------------------------

function __quickSort3Ways(arr, l, r) {
  // 递归出口
  if (r - l <= 15) {
    util.innerInsertionSort(arr, l, r)
    return
  }

  let random = Math.floor(Math.random() * (r - l + 1)) + l
  util.swap(arr, l, random)
  let v = arr[l]
  let lt = l // arr[l+1...lt] < v
  let gt = r+1  // arr[gt...r] > v
  let i = l+1  // arr[lt+1...i) === v
  while (i<gt) {
    if (arr[i] < v) {
      util.swap(arr, lt + 1, i)
      lt++
      i++
    }
    else if (arr[i] > v) {
      util.swap(arr,i,gt-1)
      gt--
    }
    else {
      i++
    }
  }
  util.swap(arr,l,lt)
  __quickSort3Ways(arr, l, lt-1)
  __quickSort3Ways(arr, gt, r)
}

let arr = util.randomArray(10000000,0,100000)

util.testSort('三路', quickSort3Ways , arr)