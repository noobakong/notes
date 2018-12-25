var all = require('../util/allSort')
var util = require('../util/util')


function quickSort (arr) {
  // 对 arr[l...r] 进行快速排序
  __quickSort(arr,0,arr.length-1)
  return arr
}

function __quickSort(arr,l,r) {
  // 递归出口
  if (l>=r) {
    return
  }
  // 使用分割来获取中间元素的位置
  let p = __partition(arr,l,r)
  __quickSort(arr,l,p-1)
  __quickSort(arr,p+1,r)
}

// 对arr[l...r] 进行partition操作
// 返回p arr[l...p-1] < arr[p]  arr[p+1,r] > arr[p]
function __partition(arr,l,r) {
  let v = arr[l]

  // 这样定义j 就满足了 arr[l+1...j] 和 arr[j+1...i) 刚开始时都不存在
  let j = l
  for(let i=l+1; i<=r;i++) {
    // 当 (arr[i] > v) 直接i++ for循环就能控制 不用再写额外代码
    if(arr[i] < v) {
      util.swap(arr,i,j+1)
      j++
    }
  }
  util.swap(arr,l,j)
  return j
}


let arr = util.randomArray(50000,0,10000)
let arr1 = arr.slice()
util.testSort('归并排序', all.mergeSort,arr)   
util.testSort('快速排序', quickSort, arr1)