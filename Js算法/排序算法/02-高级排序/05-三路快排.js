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
  // 使用分割来获取中间元素的位置
  let p = __partition(arr, l, r)
  __quickSort(arr, l, p - 1)
  __quickSort(arr, p + 1, r)
}

function __partition3ways(arr, l, r) {
  let random = Math.floor(Math.random() * (r - l + 1)) + l
  util.swap(arr, l, random)
  let v = arr[l]
  // arr[l+1...i) <= v arr(j...r] >= v 
  // 初始化满足两块均为空
  let i = l + 1
  let j = r
  while (true) {
    while (i <= r && arr[i] < v) i++
    while (r >= l + 1 && arr[j] > v) j--
    if (i > j) break
    util.swap(arr, i, j)
    i++
    j--
  }
  util.swap(arr, l, j)
  return j
}